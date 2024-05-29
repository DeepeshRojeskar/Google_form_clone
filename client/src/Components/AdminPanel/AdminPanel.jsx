import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { formProvider } from "../../context/FormContextProvider";
import { Button, Tooltip, IconButton, InputBase } from "@mui/material";
import CreateSbadmin from "../Dialogs/CreateSbadmin";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { apiConfig } from "../../apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminPanel = () => {
  const navigate = useNavigate();
  const {
    user,
    subadmins,
    allForms,
    SetAllForms,
    createSubadmins,
    refresh,
    setRefresh,
    setform,
    setcategory,
    subForms,
    setAdmin,
    setcreate,
    admin,
    allcat,
    setAllcat,
  } = formProvider();

  const handledeleteSub = async (val, ind) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };
      console.log(apiConfig.subadmin_delete + "" + val);
      const { data } = await axios.delete(
        `${apiConfig.subadmin_delete}${val}`,
        config
      );

      const updated = subadmins.filter((d, index) => index !== ind);
      createSubadmins(updated);
    } catch (e) {
      console.log(e);
    }
  };

  const get_allforms = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };

      const { data } = await axios.get(apiConfig.get_allforms, config);
      var i = data.result;
      SetAllForms(i);

      console.log(allForms);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    get_allforms();
  }, []);

  const [create, setCreate] = useState(false);
  console.log(subForms, "sdfbghjuytrf");
  const [cat, setcat] = useState("");
  const handlecategory = async () => {
    console.log(admin.token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };
      const { data } = await axios.post(
        apiConfig.create_category,
        { name: cat },
        config
      );
      var i = allcat;
      i = [...i, data.data.name];
      setRefresh(false);

      setcat("");
      toast.success(data.message);
      console.log(allcat);
    } catch (e) {
      toast.error(e.response.data.message);
      setcat("");
    }
  };

  const handlEditform = (val, frmid) => {
    console.log(frmid);
    var sub = allForms[val];
    console.log(sub);
    var cat = allForms[val].category;

    setform(sub);
    setcategory(cat);
    setcreate({ ...create, creat: "Update form", cre: false });

    navigate(`formEdit/${frmid}`);
  };

  const handlesubcreate = () => {};
  const handleDelete = (val) => {
    console.log("hi");
    try {
      console.log(allForms[val]._id, "fgh");
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };
      const { data } = axios.delete(
        `${apiConfig.delete_form}${allForms[val]._id}`,
        config
      );
      console.log(val);

      const updated = allForms.filter((d, index) => index !== val);

      SetAllForms(updated);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-div-main">
      <div className="Admin-nav-div">
        <nav className="Admin-nav">
          <div className="form-logo">
            <img src="../image/logo.png" width={40} />
            <h2 className="admin-logo-text">Forms</h2>
          </div>
          <span className="Admin-details">
            <img
              src="../image/hii.png"
              width={35}
              style={{ marginRight: -5 }}
            />
            <h5>{"Hii " + admin.user.name}</h5>
            <Tooltip title="About User">
              <button style={{ background: "none", border: "none" }}>
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
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: 5,
                  paddingTop: 5,
                }}>
                <RiLogoutBoxLine
                  size={18}
                  onClick={() => {
                    setAdmin(null);
                    localStorage.removeItem("user");
                    toast.success("Admin Logout Succesfully");
                  }}
                />
              </button>
            </Tooltip>
          </span>
        </nav>
      </div>
      <div className="Admin-content">
        <div className="sub-admin">
          <div className="admin-subsec-nav">
            <h3 className="sub-admin-title">Sub Admin</h3>
            <div className="Add-cat">
              <InputBase
                placeholder="Add new category"
                value={cat}
                onChange={(e) => setcat(e.target.value)}
              />
              <MdAddCircleOutline
                size={20}
                className="add-btn"
                onClick={handlecategory}
              />
            </div>
          </div>
          <div className="sub-admin-display">
            <Tooltip title="Create New Subadmin">
              <div
                className="create-new-sub"
                variant="text"
                onClick={() => setCreate(true)}>
                <img
                  src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
                  width={120}
                  onClick={handlesubcreate}
                  style={{}}
                />
              </div>
            </Tooltip>
            {subadmins.map((data, index) => {
              console.log(data);
              return (
                <Tooltip
                  placement="bottom"
                  title={
                    <div
                      className="delete-subadmin-btn"
                      onClick={() => handledeleteSub(data._id, index)}>
                      Delete
                    </div>
                  }>
                  <div className="created-subadmins">
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 70,
                        background: "#5DADE2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <img
                        src={data.image}
                        width={65}
                        height={65}
                        style={{ borderRadius: 70 }}
                      />
                    </div>
                    <div variant="text">
                      <p
                        style={{
                          width: 120,
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: 500,
                          margin: "8px 0px 2px 0px",
                        }}>
                        {data.username}
                      </p>
                      <p
                        style={{
                          width: 120,
                          textAlign: "center",
                          margin: 0,
                          fontSize: 12,
                        }}>
                        {data.category[0]}
                      </p>
                    </div>
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
        <div className="admin-template-sec">
          <div className="admin-template-sec-hadding">
            <div>
              <h3 className="all-form-headminng">All forms</h3>
            </div>
            <div className="all-form-admin-div">
              {allForms?.map((data, index) => {
                var desc = data.formDesc.substring(0, 14) + "..";
                return (
                  <Tooltip
                    title={
                      <div style={{ display: "flex" }}>
                        <p className="form-action">Form link</p>
                        <p
                          className="form-action-del"
                          onClick={() => {
                            handleDelete(index);
                            console.log("ram");
                          }}>
                          Delete
                        </p>
                      </div>
                    }
                    placement="bottom">
                    <Button
                      className="form-show"
                      variant="text"
                      onClick={() => handlEditform(index, data.formid)}>
                      <div className="form-get-button">
                        <img src="../image/form-cover.png" width={50} />
                        <h4 className="formname">{data.formName}</h4>
                        <p className="formcat">Cat:{data.formCat}</p>
                        <p className="formdesc">desc: {desc}</p>
                      </div>
                    </Button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <CreateSbadmin open={create} setopen={setCreate} />
    </div>
  );
};

export default AdminPanel;
