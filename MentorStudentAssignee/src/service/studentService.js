import mentorModel from "../model/mentorModel.js";
import studentModel from "../model/studentModel.js"

const getAllStudents = async (req, res) => {
    try {
        let students = await studentModel.find();
        res.status(200).send({
            message: "Student Details Fetched Successfully!!",
            data: students
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const createStudent = async (req, res) => {
    try {
        let student = await studentModel.findOne({ email: req.body.s_email });
        if (!student) {
            await studentModel.create(req.body)
            res.status(201).send({
                message: "Student Created Successfully!!"
            })
        }
        else {
            res.status(400).send({
                message: `Student with mail id ${req.body.s_email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const changeMentor = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;
        console.log('Student:', studentId);
        console.log('Mentor:', mentorId);

        const student = await studentModel.findById(studentId);
        const mentor = await mentorModel.findById(mentorId);

        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        if (!mentor) {
            return res.status(404).send({ message: "Mentor not found" });
        }

        // If the student already has a mentor, move the current mentor to previous_mentors
        if (student.mentor && student.mentor.toString() !== mentorId) {
            // Prevent duplicate mentor entries in previous_mentors
            if (!student.previous_mentors.includes(student.mentor)) {
                student.previous_mentors.push(student.mentor);
                const oldMentor = await mentorModel.findById(student.mentor);
                if (oldMentor) {
                    oldMentor.students = oldMentor.students.filter(id => id.toString() !== studentId);
                    await oldMentor.save();
                }
            }
        }

        // Update the student's current mentor
        student.mentor = mentorId;
        await student.save();

        // Add the student to the mentor's students list
        if (!mentor.students.includes(studentId)) {
            mentor.students.push(studentId);
        }
        await mentor.save();

        res.status(200).send({
            message: "Successfully changed the Mentor for the student",
            student
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};


const getPreviouslyAssignedMentor = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.studentId)
        if (!student) {
            return res.status(404).send({
                message: "Student not found"
            })
        }

        const prev_mentorsIds = student.previous_mentors

        const prev_mentors = await mentorModel.find({ _id: { $in: prev_mentorsIds } }).select({_id:0, m_name:1, m_email:1})

        res.status(200).send({
            message: "Fetched Previously Assigned Mentor for a student",
            prev_mentors
        })
    } catch (error) {
        console.error('Error fetching previously assigned mentors:', error);
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }

}

export default {
    getAllStudents,
    createStudent,
    changeMentor,
    getPreviouslyAssignedMentor
}