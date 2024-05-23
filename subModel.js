const mongoose  = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subadminSchema = new mongoose.Schema({
    name:{
        type:String,
       
        
    },
    
    username:
    {
        type:String,
    },
  
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
      },
    
      userId: {
        type: String    
      },
      
 
    role:{
        type:String,
        enum:['subadmin'],
        default:'subadmin'
    },
    
    createdForms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
   
    submittedForms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],

    visitedForms:[{type:Number,type:mongoose.Schema.Types.ObjectId,ref:'Form'}],


    submit: {
        type: Number,
        required: true,
        default:1
        
      },
  });


  ({timestamps: true});

    subadminSchema.plugin(mongoosePaginate);



const Sub = mongoose.model('Sub',subadminSchema);
module.exports=Sub;