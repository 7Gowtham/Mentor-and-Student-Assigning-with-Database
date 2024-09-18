import mongoose from "./index.js";
import { validateEmail } from "../common/validations.js";
import { Schema } from "mongoose";

const studentSchema = new mongoose.Schema({
    s_name:{
        type:String,
        required:[true, "Name is required!!"]
    },
    s_email:{
        type:String,
        required:[true, "Email is required!!"],
        validate:{
            validator: validateEmail,
            message: props => `${props.value} is not a Valid Email`
        }
    },
    mentor:{
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required:false
    },
    previous_mentors:[{
        type: Schema.Types.ObjectId,
        ref: 'Mentor',
        required:false
    }]

})

export default new mongoose.model('Student', studentSchema)