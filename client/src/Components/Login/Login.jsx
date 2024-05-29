import React, { useState } from "react";
import { useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

import "./Login.css";
import { formProvider } from "../../context/FormContextProvider";
import { apiConfig } from "../../apiConfig";

const Adminlogin = () => {
  const { admin, subadmins, setsubAdmin } = formProvider();
  const [username, setUserame] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async () => {
    try {
      console.log("df");

      const { data } = await axios.post(apiConfig.login_subadmin, {
        username,
        password,
      });
      console.log(data.data);
      setsubAdmin(data.data);
      localStorage.setItem("subuser", JSON.stringify(data.data));
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mainDiv active">
      <div className="glassMain">
        <div className="glassMainLeft">
          <img src="./image/logo.png" style={{ width: 150, marginRight: -5 }} />
          <div className="container">
            <p className="typed">Forms</p>
          </div>
          <div>
            <p className="WebInfo">Your personalized Forms Editer</p>
          </div>
        </div>

        <div className="glassMainRight">
          <img
            src="./image/login-logo.png"
            width={150}
            style={{ marginBottom: 30 }}></img>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUserame(e.target.value)}
            sx={{ width: 200, margin: 0 }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: 200, margin: 0 }}
          />
          <Button
            onClick={() => handleLogin()}
            variant="outlined"
            style={{ width: 200, margin: 10 }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
