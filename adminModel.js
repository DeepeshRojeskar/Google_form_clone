const mongoose  = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const adminSchema = new mongoose.Schema({
    username:
    {
        type:String,
    },
    email:{
        type:String, 
    },
  
    password:{
        type:String,
        required:true
    },
    // approved:[{
    //     type:Boolean,
    //     Boolean:true/false
    // }],
    
    //  visit:[{
    //     type: Boolean,
    //     default: true/false
    // }],

    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
 
},
    {timestamps: true});

    adminSchema.plugin(mongoosePaginate);



const users = mongoose.model('users',adminSchema);
module.exports=users