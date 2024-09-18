import mentorModel from "../model/mentorModel.js"
import studentModel from "../model/studentModel.js"

const getAllMentors = async(req,res)=>{
    try {
        let mentors = await mentorModel.find();
        res.status(200).send({
            message:"Mentor Details Fetched Successfully!!",
            data: mentors
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const createMentor = async(req, res)=>{
    try {
        let mentors = await mentorModel.findOne({email: req.body.m_email})
        if(!mentors){
            await mentorModel.create(req.body);
            res.status(201).send({
                message:"Mentor Created Successfully!!"
            })
        }
        else{
            res.status(400).send({
                message:`Mentor with mail id ${req.body.m_email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const assignStudentToMentor = async(req, res)=>{
    try {
        const {mentorId, studentIds} = req.body
        console.log(mentorId)
        console.log(studentIds)

        const mentor = await mentorModel.findById(mentorId)
        if(!mentor){
            return res.status(404).send({
                message:"Mentor not found"
            })
        }

        const result = await studentModel.updateMany(
            {
                _id: { $in: studentIds },
                mentor: { $exists: false }  
            },
            {
                $set: { mentor: mentorId }
            }
        )
        
        await mentorModel.findByIdAndUpdate(mentorId,{
            $push:{ students: {$each: studentIds}}
        })

        res.status(200).send({
            message:`${result.modifiedCount} students successfully assigned to the mentor`,
            updatedStudents: result.modifiedCount
        })

    } catch (error) {
        res.status(400).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getStudentsforAMentor = async(req, res)=>{
    const mentor = await mentorModel.findById(req.params.mentorId)
    console.log(mentor)
    if(!mentor){
        return res.status(404).send({
            message:"Mentor not found"
        })
    }

    const studentIds = mentor.students;

    const students = await studentModel.find({_id: {$in: studentIds}}).select({_id:0, s_name:1, s_email:1, mentor:1})

    res.status(200).send({
        message:"Fetched the students for a Mentor",
        students
    })
}

export default {
    getAllMentors,
    createMentor,
    assignStudentToMentor,
    getStudentsforAMentor
}