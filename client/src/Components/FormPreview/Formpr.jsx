import React, { useEffect, useState } from "react";
import "./Formpr.css";
import { CiImageOn } from "react-icons/ci";
import { Button, Box, MenuItem, Menu, InputBase, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { formProvider } from "../../context/FormContextProvider";
import Slider from "@mui/material/Slider";
import validation from "../validation";
import Drop from "./Droppr";
import Droppr from "./Droppr";

const Formpr = ({ img, cat }) => {
  const {
    subForms,
    setSubForms,
    category,
    setcategory,
    forms,
    setform,
    menuitem,
    setmenuitem,
  } = formProvider();
  const [actCart, setActCart] = useState(null);
  const [newfeild, setNewfeild] = useState({
    fieldName: "",
    field: "",
    inputtype: "",
    regex: null,
    regext: null,
    errmessage: "",
  });

  const option = {
    optiontext: "New text",
  };

  const [open, setopen] = useState(false);

  const onDrop = (index) => {
    console.log(actCart, index);
    var datamoving = category[actCart];
    var data = category;
    const updated = data.filter((datas, index) => index !== actCart);
    updated.splice(index, 0, datamoving);
    setcategory(updated);
  };

  return (
    <div className="class-back">
      <div className="pr-form-editor">
        <div className="section">
          <div
            className={
              forms?.formImg ? "pr-form-top pr-form-top-add" : "pr-form-top"
            }>
            {forms.formImg && (
              <img
                src={forms.formImg}
                width={"200px"}
                height={50}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            )}

            <input
              type="text"
              readOnly
              className="pr-form-name"
              placeholder="Form Name"
              value={forms.formName}
            />
            <input
              type="text"
              readOnly
              className="pr-form-desc"
              placeholder="Form Desc"
              value={forms.formDesc}
            />
          </div>
          <div className="questions">
            <Drop onDrop={() => onDrop(0)} />
            {category.map((data, index) => {
              return (
                <>
                  <div className="questionMain">
                    <div className="questionNumber">
                      <h2>{index + 1}</h2>
                    </div>
                    <div key={index}>
                      <div
                        className="pr-quetions"
                        draggable
                        onDragStart={() => setActCart(index)}
                        onDragEnd={() => setActCart(null)}>
                        <div className=".pr-navigation-div"></div>
                        <div className="pr-quetion-header">
                          <input
                            className="pr-NumberText"
                            readOnly
                            value={`${index + 1}.`}
                            style={{ width: 5 }}
                          />
                          <input
                            readOnly
                            className="pr-questionText"
                            value={data.questionText}
                          />
                          <div className="pr-quetion-header-sec">
                            {!data.questionimage && (
                              <Tooltip title="Add Image">
                                <label
                                  for="i"
                                  className="inputQimage"
                                  onClick={() => {
                                    setId(index);
                                  }}>
                                  <CiImageOn
                                    style={{ marginTop: -3 }}
                                    size={10}
                                  />
                                </label>
                              </Tooltip>
                            )}
                            <div sx={{ minWidth: 120 }}>
                              <div className="pr-Question-Type">
                                <Tooltip title="Question Types">
                                  <button className="pr-btn">
                                    {data.questioninputName}
                                  </button>
                                </Tooltip>
                                <IoIosArrowDown size={5} />
                              </div>
                              <Menu anchorEl={open} open={Boolean(open)}>
                                <div>
                                  {menuitem.map((fields, i) => {
                                    return (
                                      <MenuItem
                                        onClick={() => {
                                          handleChange(
                                            fields.field,
                                            fields.fieldName,
                                            fields.regex,
                                            fields.errmessage,
                                            id
                                          );
                                        }}>
                                        {fields.fieldName}
                                      </MenuItem>
                                    );
                                  })}
                                </div>
                              </Menu>
                            </div>
                          </div>
                        </div>
                        {data.questionimage && (
                          <img
                            src={
                              data.questionimage
                                ? data.questionimage
                                : "./image/user.png"
                            }
                            width={40}
                            height={40}
                            style={{ padding: 10 }}
                          />
                        )}
                        <div className="quetion-option">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              console.log(e);
                            }}>
                            <div className="not-option">
                              {data.questionType === "text" && (
                                <input
                                  readOnly
                                  className="pr-discText"
                                  name="text"
                                  placeholder="Write ans.."
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "date" && (
                                <input
                                  readOnly
                                  className="date"
                                  type="date"
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "password" && (
                                <input
                                  readOnly
                                  className="pr-discText"
                                  type="password"
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "email" && (
                                <input
                                  readOnly
                                  className="pr-discText"
                                  placeholder="Enter mail.."
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "pdf" && (
                                <input
                                  readOnly
                                  className="file"
                                  type="file"
                                  ans
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "range" && (
                                <div
                                  style={{
                                    width: 50,
                                    marginLeft: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                  }}>
                                  <Slider
                                    defaultValue={30}
                                    value={data.Ans}
                                    size="small"
                                  />
                                  <p className="pr-slider">{data.Ans}</p>
                                </div>
                              )}
                              {data.questionType === "image" && (
                                <input
                                  className="file"
                                  type="file"
                                  ans
                                  value={data.Ans}
                                />
                              )}
                              {data.questionType === "make yours" && (
                                <div className="new-field-div">
                                  <InputBase
                                    readOnly
                                    className="pr-new-field"
                                    value={newfeild.fieldName}
                                    placeholder="Enter New Field"
                                  />
                                  <InputBase
                                    readOnly
                                    className="pr-new-field"
                                    value={newfeild.field}
                                    placeholder="Field type'"
                                  />
                                  <InputBase
                                    readOnly
                                    className="pr-new-field"
                                    value={newfeild.regext}
                                    placeholder="Regex if applied"
                                  />
                                  <InputBase
                                    readOnly
                                    className="pr-new-field"
                                    value={newfeild.error}
                                    placeholder="Error for validation"
                                  />
                                  <Button className="pr-new-field-btn">
                                    Add
                                  </Button>
                                </div>
                              )}
                            </div>
                            {(data.questionType === "radio" ||
                              data.questionType == "CheckBox") &&
                              data.options.map((optdata, optindex) => {
                                {
                                  console.log(data.questionType);
                                }
                                return (
                                  <div className="pr-options">
                                    <div>
                                      <input
                                        readOnly
                                        type={data.questionType}
                                        name="fav_language"
                                        className="pr-in"
                                      />
                                      <input
                                        readOnly
                                        type="text"
                                        className="pr-optionText"
                                        value={
                                          data.options[optindex].optiontext
                                        }
                                      />
                                    </div>
                                    <div>
                                      <RxCross2
                                        className="option-delete-btn"
                                        size={7}
                                        style={{ marginRight: 0 }}
                                      />
                                      <br />{" "}
                                    </div>
                                  </div>
                                );
                              })}
                            {(data.questionType === "radio" ||
                              data.questionType == "CheckBox") && (
                              <div style={{ width: 200 }}>
                                {data.questionType != "text" ? (
                                  <Button
                                    style={{
                                      marginLeft: 3,
                                      width: 20,
                                      height: 20,
                                      fontSize: 6,
                                    }}
                                    variant="text"
                                    onClick={() => handleOptions(index)}>
                                    Add Options
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Drop onDrop={() => onDrop(index + 1)} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formpr;
