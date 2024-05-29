export default function validation(data) {
    
    // const error ={}
    // const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    console.log(data)
   
   var error="";
   
   if(data.data3===""){
    error="field is Required"
   }else if(!data.data2.test(data.data3)){
    error=data.data4
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
