import React, { useEffect, useState } from "react";

import {
  Tooltip,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { SlLogout } from "react-icons/sl";
import Form from "../Form/Form";
import "./FormEditor.css";
import { formProvider } from "../../context/FormContextProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Formpr from "../FormPreview/Formpr";
import toast from "react-hot-toast";
import axios from "axios";
import { apiConfig } from "../../apiConfig";
const FormEditor = () => {
  const navigate = useNavigate();

  const {
    subadmin,
    refresh,
    setRefresh,
    forms,
    setSubForms,
    setform,
    category,
    subForms,
    res,
    setRes,
    setcategory,
    create,
    setsubAdmin,
    setcreate,
  } = formProvider();
  const [img, setimg] = useState(null);
  const [cat, setcat] = useState();
  const handleChange = (e) => {
    setcat(e.target.value);
  };
  const handledata = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${subadmin.token}`,
          "Content-Type": "application/json",
        },
      };
      var fr = forms;
      fr.category = category;
      if (create.cre === true) {
        console.log(fr);
        var dat = subForms;

        console.log(dat);
        const { data } = await axios.post(apiConfig.create_form, fr, config);
        dat.push(data.data);
        console.log(data);
        setSubForms(dat);
      } else {
        var sub = subForms;
        const { data } = await axios.put(apiConfig.updateForm, fr, config);
        sub.filter((element, index) => {
          if (element.formid === fr.formid) {
            sub[index] = fr;
          }
        });

        setSubForms(sub);
      }
      setform({
        formid: "",
        formName: "ram",
        formDesc: "asdfghjkl",
        formImg: "",
        formCat: "movies",
        category: category,
      });
      setcategory([
        {
          questionText: "what is the ...",
          questionimage: null,
          questioninputName: "radio",
          questionType: "radio",
          errmessage: null,
          questionregex: null,
          options: [
            { optiontext: "option 1" },
            { optiontext: "option 2" },
            { optiontext: "option 3" },
            { optiontext: "option 4" },
          ],
          ans: "ans",
        },
      ]);

      navigate("/");
      toast.success("Your Form is Created click on form To edit");
      console.log(subForms);
    } catch (e) {
      console.log(e);
    }
  };

  const handleres = () => {
    var fr = forms;
    fr.category = category;
    setform(fr);
    console.log(fr);

    navigate(`/fill-form/${fr.formid}`);
  };
  useEffect(() => {
    console.log(subForms);
  }, [subForms]);
  return (
    <div>
      <div className="home-nav-div">
        <nav className="home-nav">
          <div className="form-logo">
            <img src="../image/logo.png" width={40} />
            <h2 className="form-logo-txt">Forms</h2>
          </div>

          <span className="home-details">
            <img
              src="../image/hii.png"
              width={35}
              style={{ marginRight: -5 }}
            />

            <h5 className="subadmin-name">Hii Aditya </h5>
            <Tooltip title="About User">
              <button className="avatar-img-btn">
                <img
                  src="../image/user1.jpeg"
                  width={38}
                  height={38}
                  style={{ borderRadius: 40, marginTop: 3 }}
                />
              </button>
            </Tooltip>
            <Tooltip title="Logout">
              <button
                onClick={() => setsubAdmin(null)}
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: 5,
                  paddingTop: 5,
                  cursor: "pointer",
                }}>
                <SlLogout size={18} />
              </button>
            </Tooltip>
          </span>
        </nav>
      </div>
      <div className="form-content">
        <div className="left-box">
          <div className="pr-div">
            <Formpr />
          </div>
          <div className="right-box-div">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={cat}
                label="category"
                onChange={(e) => handleChange(e)}>
                <MenuItem value={"Marketing"}>Marketing</MenuItem>
                <MenuItem value={"Finance"}>Finance</MenuItem>
                <MenuItem value={"Studies"}>Studies</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" className="add-image">
              <label for="inputImg" className="inputBBtn">
                {img === null ? "Add Image" : "CHange Img"}
              </label>
            </Button>
          </div>
          <input
            type="file"
            id="inputImg"
            onChange={(e) => {
              setimg(e.target.files[0]);
              console.log(img);
            }}
            style={{ display: "none" }}
          />
        </div>
        <Form img={img} cat={cat} />
        <div className="right-box">
          <Button
            onClick={handledata}
            className="create-form"
            variant="contained">
            {create.creat}
          </Button>
          <Button onClick={handleres} className="view-Res" variant="contained">
            View Response
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
