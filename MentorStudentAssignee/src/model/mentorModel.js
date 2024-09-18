import mongoose from "./index.js";
import { validateEmail } from "../common/validations.js";
import { Schema } from "mongoose";

const mentorSchema = new mongoose.Schema({
    m_name:{
        type:String,
        required:[true, "Mentor Name is required!!"]
    },
    m_email:{
        type:String,
        required:[true, "Email is required!!"],
        validate:{
            validator: validateEmail,
            message: props => `${props.value} is not a valid Email!!`
        }
    },
    topics:{
        type:String,
        enum:{
            values:["Full Stack Development", "Data Science"],
            message:"{VALUE} is not supported"
        }
    },
    students:[{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required:true
    }]
})

export default new mongoose.model('Mentor', mentorSchema)