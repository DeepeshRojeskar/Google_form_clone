const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const subadminRoutes = require("./routes/subadminRoutes");
const formRoutes = require("./routes/formRoutes")

const mongoose  = require("mongoose")
const cors = require("cors")
const mongodb = require("mongodb")

const ImageModel = require("./models/imageModel");
const bodyParser = require("body-parser");

const upload = require("./multer")




const fs = require("fs")    




mongoose.connect("mongodb://127.0.0.1:27017/Google_form")
.then(()=>{
    console.log("connection succefully")

}).catch((error)=>{
    console.log("connection Failed")

})







app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json({limit : '50mb',extended : true}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}))
app.use("/api",adminRoutes);
app.use("/sub",subadminRoutes);
app.use("/form",formRoutes);


app.post('/uploadFile',upload.single('myFile'),async(req,res,next)=>{
    const file = req.file;

    if(!file){
        const error = new Error("Please upload a file")
        error.httpStatusCode = 400;
        return next(error);
    }
    res.status(200).json({status:true,message:"Upload single file successfully",file})
})


app.post("/uploadmultiple",upload.array('myFiles',24),(req,res,next)=>{
    const files = req.files;
    if(!files){
        const error = new Error("Please choose files");
        error.httpStatusCode=400

        return next(error)

     }
     res.status(200).json({status:true,message:"Upload multiple files successfully",files})




})


app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')

    var finalImg = {
        contentType:req.file.mimetype,
        path:req.file.path,
        image: Buffer(encode_image,'base64')
    };
    // var newImage = new ImageModel().insertOne(finalImg,(err,result)=>{
    //     console.log(result,newImage)
    //     if(err){
    //         return console.log(err);
            
    //     }
        // console.log("Saved to database")
        res.contentType(finalImg.contentType);
        res.send(finalImg.image);

    })

// })




app.get("/",async(req,res)=>{
    try{
        const result = await ImageModel.find().lean();
        res.status(200).json({status:true,message:"Get all uploads images",result});

    }catch(e){
        res.send(e)

    }

})



const PORT= process.env.PORT || 3005;


app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
  });