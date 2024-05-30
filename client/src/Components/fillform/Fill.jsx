import React, { useEffect, useState } from "react";
import { formProvider } from "../../context/FormContextProvider";
import { Tooltip, Button, setRef } from "@mui/material";
import "./Fill.css";
import { useFetcher, useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
import validation from "../validation";
import toast from "react-hot-toast";
import axios from "axios";
import { apiConfig } from "../../apiConfig";
import { useParams } from "react-router-dom";
const Fill = () => {
  const { forms, setform, subadmin } = formProvider();

  const params = useParams().formid;
  const [fieldform, setfieldform] = useState({
    formid: forms.formid,
    formName: forms.formName,
    Name: null,
    Email: null,
    category: [],
  });
  const formforfilling = async () => {
    try {
      const { data } = await axios.get(apiConfig.get_single + params);
      setform(data.form);
      console.log(forms);

      forms.category.map((data) => {
        var ram = { que: data.questionText, ans: null };
        var i = fieldform;
        i.category.push(ram);
        setfieldform(i);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    var i = fieldform;

    if (
      (fieldform.Name !== null && fieldform.Email !== null) ||
      (fieldform.Email === "" && fieldform.Name === "")
    ) {
      console.log(fieldform);
      navigate(`/submited`);
    } else {
      toast.error("Name and email is required");
    }
  };

  useEffect(() => {
    formforfilling();
  }, []);

  console.log(fieldform);

  const handleAns = (val, index) => {
    var an = fieldform;
    an.category[index].ans = val;
    setfieldform(an);
    console.log(an);
  };
  const handleError = (res, index) => {
    var i = forms;
    i.category[index].error = res;
    setform(i);
  };

  const handleoptionchange = (val, index, optindex) => {
    var opt = {};
    opt[optindex] = !opt.optindex;
    var f = fieldform;
    f.category[index].ans = opt;
    setfieldform(f);
  };
  const handleoptionchange2 = (val, index, optindex) => {
    console.log("r");
    var f = fieldform;
    if (f.category[index].ans) {
      var opt = f.category[index].ans;
    } else {
      var opt = {};
    }
    if (!opt[optindex]) {
      opt[optindex] = "true";
    } else {
      delete opt[optindex];
    }

    f.category[index].ans = opt;
    setfieldform(f);
  };

  return (
    <div>
      <div className="fill-form-main">
        <div className="section fil-section">
          <div className={forms.formImg ? "form-top form-top-add" : "form-top"}>
            {forms.formImg && (
              <img
                src={forms.formImg}
                width={"550px"}
                height={150}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            )}
            <p className="fill-form-name">{forms.formName}</p>
            <p className="fill-form-desc">{forms.formDesc}</p>
          </div>
          <div className="questions">
            <div className="quetionsfill">
              <p className="user-detail-q1">Name</p>
              <input
                className="user-detail"
                onChange={(e) => {
                  setfieldform({ ...fieldform, Name: e.target.value });
                }}
              />
              <p className="user-detail-q2">Email</p>
              <input
                className="user-detail"
                onChange={(e) => {
                  setfieldform({ ...fieldform, Email: e.target.value });
                }}
              />
            </div>

            {forms.category.map((data, index) => {
              console.log(data);
              return (
                <>
                  <div key={index}>
                    <div className="quetionsfill">
                      <div className="fill-quetion-header">
                        <p>{`${index + 1}. ${data.questionText}`}</p>
                        <div className="quetion-header-sec"></div>
                      </div>
                      {data.questionimage && (
                        <img
                          src={
                            data.questionimage
                              ? data.questionimage
                              : "./image/user.png"
                          }
                          width={120}
                          height={120}
                          style={{ padding: 10 }}
                        />
                      )}
                      <div className="quetion-option">
                        {data.questionType === "text" && (
                          <input
                            className="discText"
                            placeholder="Write ans.."
                            value={data.ans}
                            onChange={(e) => {
                              handleAns(e.target.value, index);
                              if (data.questionregex !== null) {
                                var res = validation({
                                  data4: data.errmessage,
                                  data: data.questioninputName,
                                  data2: data.questionregex,
                                  data3: e.target.value,
                                });
                                handleError(res, index);
                                seterror(res);
                              }
                            }}
                          />
                        )}
                        {data.questionType === "date" && (
                          <input
                            className="date"
                            type="date"
                            value={data.Ans}
                            onChange={(e) => handleAns(e.target.value, index)}
                          />
                        )}
                        {data.questionType === "password" && (
                          <input
                            className="discText"
                            type="password"
                            value={data.ans}
                            onChange={(e) => {
                              handleAns(e.target.value, index);
                              if (data.questionregex !== null) {
                                var res = validation({
                                  data4: data.errmessage,
                                  data: data.questioninputName,
                                  data2: data.questionregex,
                                  data3: e.target.value,
                                });
                                handleError(res, index);
                                seterror(res);
                              }
                            }}
                          />
                        )}
                        {data.questionType === "email" && (
                          <input
                            className="discText"
                            placeholder="Enter mail.."
                            value={data.ans}
                            onChange={(e) => {
                              handleAns(e.target.value, index);
                              if (data.questionregex !== null) {
                                var res = validation({
                                  data: data.questioninputName,
                                  data2: data.questionregex,
                                  data3: e.target.value,
                                  data4: data.errmessage,
                                });
                                handleError(res, index);
                                seterror(res);
                              }
                            }}
                          />
                        )}
                        {data.questionType === "pdf" && (
                          <input
                            className="file"
                            type="file"
                            ans
                            value={data.ans}
                            onChange={(e) => handleAns(e.target.value, index)}
                          />
                        )}
                        {data.questionType === "range" && (
                          <div
                            style={{
                              width: 150,
                              marginLeft: 20,
                              display: "flex",
                              alignItems: "center",
                              gap: 15,
                            }}>
                            <Slider
                              defaultValue={30}
                              value={data.ans}
                              size="medium"
                              onChange={(e) => handleAns(e.target.value, index)}
                            />
                            {data.ans}
                          </div>
                        )}
                        {data.questionType === "image" && (
                          <input
                            className="file"
                            type="file"
                            ans
                            value={data.ans}
                            onChange={(e) => handleAns(e.target.value, index)}
                          />
                        )}
                        {(data.questionType === "radio" ||
                          data.questionType == "CheckBox") &&
                          data.options.map((optdata, optindex) => {
                            return (
                              <div className="fill-options-div">
                                <input
                                  type={data.questionType}
                                  onChange={(e) => {
                                    data.questionType === "radio"
                                      ? handleoptionchange(
                                          e.target.value,
                                          index,
                                          optindex
                                        )
                                      : handleoptionchange2(
                                          e.target.value,
                                          index,
                                          optindex
                                        );
                                  }}
                                  name={index}
                                  className="in"
                                />
                                <p className="fill-option">
                                  {data.options[optindex].optiontext}
                                </p>
                              </div>
                            );
                          })}
                        {data.error && <p className="error-m">{data.error}</p>}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <input className="submit-form" type="submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Fill;
