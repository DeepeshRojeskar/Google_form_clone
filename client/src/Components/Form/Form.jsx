import React, { useEffect, useState } from "react";
import "./Form.css";
import { CiImageOn } from "react-icons/ci";
import { Button, Box, MenuItem, Menu, InputBase, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { formProvider } from "../../context/FormContextProvider";
import Slider from "@mui/material/Slider";
import validation from "../validation";
import Drop from "../Drop";
import { useParams } from "react-router-dom";
import { MdCoPresent, MdOutlineContentCopy } from "react-icons/md";

import { MdDelete } from "react-icons/md";
const Form = ({ img, cat }) => {
  const params = useParams().formid;
  console.log(params);
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
  const [actoption, setActoption] = useState(null);
  const [newfeild, setNewfeild] = useState({
    fieldName: "",
    field: "",
    inputtype: "",
    regex: null,
    regext: null,
    errmessage: "",
  });

  const questions = {
    questionText: "what is the....",
    questionimage: null,
    questioninputName: "radio",
    questionType: "radio",
    questionregex: null,
    error: null,
    options: [
      { optiontext: "option 1" },
      { optiontext: "option 2" },
      { optiontext: "option 3" },
      { optiontext: "option 4" },
    ],
  };

  useEffect(() => {
    setform({ ...forms, formImg: img, formCat: cat });
  }, [img, cat]);

  const option = {
    optiontext: "New Option",
  };

  useEffect(() => {
    setform({ ...forms, formImg: img });
  }, [img]);
  useEffect(() => {
    setform({ ...forms, formCat: cat });
  }, [category]);
  const [open, setopen] = useState(false);

  const handleClick = (event) => {
    setopen(event.currentTarget);
  };

  const handleClose = () => {
    setopen(false);
  };

  const [id, setId] = useState(null);

  const handleChange = (val, val2, val3, val4, index) => {
    console.log(val3);
    var que = [...category];
    que[index].ans = null;
    que[index].questionType = val;
    que[index].questioninputName = val2;
    que[index].questionregex = val3;
    que[index].errmessage = val4;
    console.log(val);
    setcategory(que);
    setId(null);
    handleClose();
  };
  const handleque = (val, index) => {
    var que = [...category];

    que[index].questionText = val;
    setcategory(que);
  };
  const handleImg = (index, val) => {
    var que = [...category];
    que[index].questionimage = val;
    setId(null);
    setcategory(que);
  };

  const handleOptions = (val) => {
    var opt = [...category];
    opt[val].options.push(option);
    setcategory(opt);
  };
  const handleOptChange = (val, index, optindex) => {
    var optch = [...category];
    optch[index].options[optindex].optiontext = val;
    setcategory(optch);
  };

  const handledeleteopt = (index, val) => {
    var opt = [...category];
    opt[index].options.splice(val, 1);
    setcategory(opt);
  };
  const handleAns = (val, index) => {
    var que = [...category];

    que[index].ans = val;
    setcategory(que);
  };
  const handleadd = () => {
    setcategory([...category, questions]);
  };

  console.log(category);

  const handleMenuItem = () => {
    var i = newfeild;
    i.regex = new RegExp(newfeild.regext);
    delete i.regext;
    delete i.inputtype;
    setNewfeild({
      fieldName: "",
      field: "",
      inputtype: "",
      regex: null,
      regext: null,
    });
    var j = menuitem;
    j.push(i);
    setmenuitem(j);
    console.log(menuitem);
  };

  const handleQuestionsCopy = (index) => {
    var que = category[index];
    var cat = category;
    var newcat = cat.toSpliced(index, 0, que);
    setcategory(newcat);
  };
  const handleQuestionsDelele = (ind) => {
    console.log(ind);
    var cat = category;
    const updated = cat.filter((datas, index) => index !== ind);
    toast.success("deleted succesfully");
    setcategory(updated);
  };
  const onDrop = (actop, index) => {
    console.log(actoption, actop);
    var datamoving = category[index].options[actoption];
    console.log(datamoving);
    var data = category[index].options;
    const updated = data.filter((datas, inde) => inde !== actoption);
    updated.splice(actop, 0, datamoving);
    var cat = category;
    cat[index].options = updated;
    setcategory(cat);
  };

  useEffect(() => {
    {
      toast((t) => (
        <span>
          Welcome to Form Editer here you can create Form for your organization
          <br />
          <Button variant="text" onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </Button>
        </span>
      ));
    }
  }, []);

  return (
    <div>
      <div className="form-editor">
        <div className="section">
          <div className={forms.formImg ? "form-top form-top-add" : "form-top"}>
            {forms.formImg && (
              <img
                src={formImg}
                width={"550px"}
                height={150}
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            )}

            <input
              type="text"
              className="form-name"
              placeholder="Form Name"
              value={forms.formName}
              onChange={(e) => setform({ ...forms, formName: e.target.value })}
            />
            <input
              type="text"
              className="form-desc"
              placeholder="Form Desc"
              value={forms.formDesc}
              onChange={(e) => setform({ ...forms, formDesc: e.target.value })}
            />
          </div>
          <div className="questions">
            {category.map((data, index) => {
              return (
                <>
                  <div key={index}>
                    <div className="quetions">
                      <div className="navigation-div">
                        <MdOutlineContentCopy
                          size={17}
                          color="#85C1E9"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleQuestionsCopy(index)}
                        />
                        <MdDelete
                          size={17}
                          color="#D98880"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleQuestionsDelele(index)}
                        />
                      </div>
                      <div className="quetion-header">
                        <input
                          className="NumberText"
                          readOnly
                          value={`${index + 1}.`}
                          style={{ width: 15 }}
                        />
                        <input
                          className="questionText"
                          value={data.questionText}
                          onChange={(e) => {
                            handleque(e.target.value, index);
                          }}
                        />
                        <input
                          type="file"
                          id="i"
                          style={{ display: "none" }}
                          onChange={(e) => handleImg(id, e.target.files[0])}
                        />
                        <div className="quetion-header-sec">
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
                                  size={26}
                                />
                              </label>
                            </Tooltip>
                          )}
                          <div sx={{ minWidth: 120 }}>
                            <div
                              className="Question-Type"
                              onClick={handleClick}>
                              <Tooltip title="Question Types">
                                <button
                                  className="btn"
                                  onClick={() => {
                                    setId(index);
                                  }}>
                                  {data.questioninputName}
                                </button>
                              </Tooltip>
                              <IoIosArrowDown />
                            </div>
                            <Menu
                              anchorEl={open}
                              open={Boolean(open)}
                              onClose={handleClose}>
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
                          width={120}
                          height={120}
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
                                className="discText"
                                name="text"
                                placeholder="Write ans.."
                                value={data.ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "date" && (
                              <input
                                className="date"
                                type="date"
                                value={data.ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "password" && (
                              <input
                                className="discText"
                                type="password"
                                value={data.ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "email" && (
                              <input
                                className="discText"
                                placeholder="Enter mail.."
                                value={data.ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "pdf" && (
                              <input
                                className="file"
                                type="file"
                                ans
                                value={data.ans}
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
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
                                  onChange={(e) =>
                                    handleAns(e.target.value, index)
                                  }
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
                                onChange={(e) =>
                                  handleAns(e.target.value, index)
                                }
                              />
                            )}
                            {data.questionType === "make yours" && (
                              <div className="new-field-div">
                                <InputBase
                                  className="new-field"
                                  value={newfeild.fieldName}
                                  placeholder="Enter New Field"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      fieldName: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.field}
                                  placeholder="Field type'"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      field: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.regext}
                                  placeholder="Regex if applied"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      regext: e.target.value,
                                    })
                                  }
                                />
                                <InputBase
                                  className="new-field"
                                  value={newfeild.error}
                                  placeholder="Error for validation"
                                  onChange={(e) =>
                                    setNewfeild({
                                      ...newfeild,
                                      errmessage: e.target.value,
                                    })
                                  }
                                />
                                <Button
                                  className="new-field-btn"
                                  onClick={() => {
                                    handleMenuItem();
                                    console.log(newfeild);
                                    handleChange(
                                      newfeild.field,
                                      newfeild.fieldName,
                                      newfeild.regex,
                                      newfeild.errmessage,
                                      index
                                    );
                                  }}>
                                  Add
                                </Button>
                              </div>
                            )}
                          </div>
                          {(data.questionType === "radio" ||
                            data.questionType == "CheckBox") && (
                            <Drop onDrop={() => onDrop(0, index)} />
                          )}
                          {(data.questionType === "radio" ||
                            data.questionType == "CheckBox") &&
                            data.options.map((optdata, optindex) => {
                              return (
                                <>
                                  <div
                                    className="options"
                                    draggable
                                    onDragStart={() => setActoption(optindex)}
                                    onDragEnd={() => setActoption(null)}>
                                    <div>
                                      <input
                                        type={data.questionType}
                                        name="fav_language"
                                        className="in"
                                      />
                                      <input
                                        type="text"
                                        className="optionText"
                                        value={
                                          data.options[optindex].optiontext
                                        }
                                        onChange={(e) =>
                                          handleOptChange(
                                            e.target.value,
                                            index,
                                            optindex
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <RxCross2
                                        className="option-delete-btn"
                                        size={20}
                                        onClick={() =>
                                          handledeleteopt(index, optindex)
                                        }
                                        style={{ marginRight: 0 }}
                                      />
                                      <br />{" "}
                                    </div>
                                  </div>
                                  <Drop
                                    onDrop={() => onDrop(optindex + 1, index)}
                                  />
                                </>
                              );
                            })}
                          {(data.questionType === "radio" ||
                            data.questionType == "CheckBox") && (
                            <div style={{ width: 550 }}>
                              {data.questionType != "text" ? (
                                <Button
                                  style={{ marginLeft: 10 }}
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
                </>
              );
            })}
          </div>
          <Button onClick={() => handleadd()} className="add-field">
            Add Field
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
