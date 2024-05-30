export default function validation(data) {
  // const error ={}
  // const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  console.log(data);

  const regex = new RegExp(data.data2);
  var error = "";
  console.log(data);

  if (data.data3 === "") {
    error = "field is Required";
  } else if (!regex.test(data.data3)) {
    error = data.data4;
  }
  return error;

  // if(value.name===""){
  //     error.name="Name is Required"
  // }
  // if(value.email===""){

  //     error.email="Email is Required"
  // }else if(email_pattern.test(value.email)){
  //     error.email="Email is not Correct"
  // }
  // if(value.password==""){

  //     error.password="Password is Required"
  // }else if(!password_pattern.test(value.password)){
  //     error.password="Password is not Correct"
  // }
  // return error
}
