const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const OptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    open: [{
        type: Boolean,
        default: false
    }],
    optionText: {
        type: String
    },
    optionImage: [{
        type: String,
        default: ""
    }]
});

const QuestionSchema = new mongoose.Schema({
    open: [{
        type: Boolean,
        default: false
    }],
    questionType: [{
        type: String,
        enum: ['single_choice', 'multiple_choice', 'text'],
        required: true
    }],
    questionText: [{
        type: String
    }],
    questionImage: [{
        type: String,
        default: ""
    }],
    ans: {
        type: String
    },
    options: [OptionSchema]
});
QuestionSchema.index({ location: "2dsphere" });

const FormSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subadmin"
    },
    name: {
        type: String
    },
    formImage: [{
        type: String,
        default: ""
    }],
    description: [{
        type: String,
        default: ""
    }],
   
    pin: {
        type: String
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index:"2dsphere"
        },
        formattedaddress:{
            type:String

        },
        createdAt:{
            type:Date,
            default:Date.now

        },

    },
    approved: [{
        type: Boolean,
        default: false
    }],
    visit: [{
        type: Boolean,
        default: false
    }],
    questions: [QuestionSchema],
    stared: {
        type: Boolean,
        default: false
    },
    formType: {
        type: String,
        default: "anonymous"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    }
}, {
    timestamps: true
});

FormSchema.plugin(mongoosePaginate);
const Form = mongoose.model('Form', FormSchema);
module.exports = Form;
