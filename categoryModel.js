const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  slug: {
    type: String,
    lowercase: true,
    unique:true
  
  },
  role:{
      type:String,
      enum:['admin','subadmin'],
      default:'admin'
  },
  category:{
    type:String,
  
  },
  categories: {
   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
},
});
categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('Category',categorySchema)

module.exports = Category;