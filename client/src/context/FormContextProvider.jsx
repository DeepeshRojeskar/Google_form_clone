import axios from "axios";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { apiConfig } from "../apiConfig";

const FormContext = React.createContext();

const FormContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [subadmin, setsubAdmin] = useState(null);
  const [user, setUser] = useState("ram");
  const [subForms, setSubForms] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [subadmins, createSubadmins] = useState([]);

  const [allForms, SetAllForms] = useState();
  const get_allcat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };

      const { data } = await axios.get(apiConfig.get_allCategory, config);
      console.log(data);
      var i = data.categories;
      setAllcat(i);
    } catch (e) {
      console.log(e);
    }
  };

  const get_allsubs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      };

      const { data } = await axios.get(apiConfig.get_allsubs, config);
      createSubadmins(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const get_allsubadminForm = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${subadmin.token}`,
      },
    };
    const { data } = await axios.get(
      `${apiConfig.getallsubadminform}${subadmin.user.id}`,
      config
    );
    setSubForms(data.data);
  };
  const [allcat, setAllcat] = useState([]);

  useEffect(() => {
    get_allcat();
    get_allsubs();
  }, [admin]);
  useEffect(() => {
    get_allcat();
  }, [refresh]);
  useEffect(() => {
    get_allsubadminForm();
  }, [subadmin]);

  const [menuitem, setmenuitem] = useState([
    {
      fieldName: "make yours",
      field: "make yours",
      regex: null,
      errmessage: "",
    },
    { fieldName: "radio", field: "radio", regex: null, errmessage: "" },
    { fieldName: "CheckBox", field: "CheckBox", regex: null, errmessage: "" },
    { fieldName: "text", field: "text", regex: null, errmessage: "" },
    {
      fieldName: "password",
      field: "password",
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      errmessage: "Username should contain 8 digit 1 uppercase 1 unique",
    },
    {
      fieldName: "email",
      field: "email",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
      errmessage: "",
    },
    { fieldName: "date", field: "date", regex: null, errmessage: "" },
    { fieldName: "pdf", field: "pdf", regex: null, errmessage: "" },
    { fieldName: "range", field: "range", regex: null, errmessage: "" },
    { fieldName: "image", field: "image", regex: null, errmessage: "" },
  ]);

  const [category, setcategory] = useState([
    {
      questionText: "What is the...",
      questionimage: null,
      questioninputName: "radio",
      questionType: "radio",
      questionregex: null,
      errmessage: null,

      options: [
        { optiontext: "Option 1" },
        { optiontext: "Option 2" },
        { optiontext: "Option 3" },
        { optiontext: "Option 4" },
      ],
      ans: "ans",
    },
  ]);

  const [create, setcreate] = useState({
    creat: "create form",
    cre: true,
  });

  const [forms, setform] = useState({
    formid: "",
    formName: "",
    formDesc: "",
    formImg: "",
    formCat: "Radio",
    category: category,
  });

  const [res, setRes] = useState([]);

  // useEffect(()=>{

  //     handleData();
  //     console.log(admin?.token);

  // },[admin])

  return (
    <FormContext.Provider
      value={{
        refresh,
        setRefresh,
        menuitem,
        setmenuitem,
        create,
        setcreate,
        res,
        setRes,
        allcat,
        setAllcat,
        subadmins,
        createSubadmins,
        user,
        setUser,
        subForms,
        setSubForms,
        category,
        setcategory,
        forms,
        setform,
        admin,
        setAdmin,
        subadmin,
        setsubAdmin,
        allForms,
        SetAllForms,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export const formProvider = () => {
  return useContext(FormContext);
};

export default FormContextProvider;
