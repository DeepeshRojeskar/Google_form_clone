import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./CreateSbadmin.css";
import axios from "axios";
import {
  TextField,
  Box,
  MenuItem,
  Button,
  Typography,
  Menu,
  InputBase,
} from "@mui/material";
import { formProvider } from "../../context/FormContextProvider";

import { IoIosArrowDown } from "react-icons/io";
import { blue } from "@mui/material/colors";
import { apiConfig } from "../../apiConfig";

const CreateSbadmin = ({ open, setopen }) => {
  const handleClose = () => setopen(false);
  const handleClosecat = () => setcat(false);
  const [cat, setcat] = useState(null);
  const { subadmins, createSubadmins, allcat, setAllcat, admin } =
    formProvider();
  const [image, setImg] = useState(null);
  const handleClickcat = (event) => {
    setcat(event.currentTarget);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState([]);

  const handlecreation = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };
      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", image);
      formData.append("category", category);
      console.log(formData);
      const { data } = await axios.post(
        apiConfig.reg_subadmin,
        formData,
        config
      );
      console.log(data);

      createSubadmins([...subadmins, data.user]);
      setCategory(null);
      setPassword(null);
      setUsername(null);

      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // <img src={img?URL.createObjectURL(img):"./image/user.png"} width={90} height={90} style={{borderRadius:90}} />
    // {!img&&<label for='inputImg' className='inputImageBtn'>image</label>}
    // <input type='file' id='inputImg' onChange={(e)=>{setImg(e.target.files[0])}} style={{display:'none'}}/>

    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setImg(null);
      }}>
      <div className="sbmainDiv">
        <div className="glassMain">
          <div className="glassMainLeft">
            <img
              src="./image/logo.png"
              style={{ width: 150, marginRight: -5 }}
            />
            <div className="container">
              <p className="typed">Subadmin</p>
            </div>
            <div>
              <p className="WebInfo">Create subadmin for work</p>
            </div>
          </div>

          <div className="glassMainRight">
            <img
              src={image ? URL.createObjectURL(image) : "./image/user.png"}
              width={110}
              height={110}
              style={{ borderRadius: 90 }}
            />

            {!image && (
              <label for="inputImg" className="inputImageBtn">
                image
              </label>
            )}
            <input
              type="file"
              id="inputImg"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />

            <TextField
              id="outlined-basic"
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: 200, margin: 0 }}
            />

            <div className="add-cat-box" onClick={handleClickcat}>
              <InputBase
                readOnly
                className="add-cat"
                value={category}
                placeholder="Add category"></InputBase>
              <IoIosArrowDown />
            </div>
            <Menu
              anchorEl={cat}
              open={Boolean(cat)}
              onClose={() => {
                handleClosecat();
              }}>
              <MenuItem>
                <div className="cat-item">
                  {allcat.map((data, index) => {
                    return (
                      <div
                        className="cat-items"
                        onClick={() => {
                          console.log(category);
                        }}>
                        <input
                          type="checkbox"
                          onClick={() => {
                            var i = category;
                            i.push(data.name);
                            setCategory(i);
                            console.log(category);
                          }}
                        />
                        {data.name}
                      </div>
                    );
                  })}
                  <Button onClick={handleClosecat}>Add</Button>
                </div>
              </MenuItem>
            </Menu>

            <TextField
              id="outlined-basic"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: 200, margin: 0 }}
            />
            <Button
              variant="outlined"
              style={{ width: 200, margin: 10 }}
              onClick={() => {
                handlecreation();
                setImg(null);
              }}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateSbadmin;
