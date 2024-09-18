import express from 'express'
import mentorService from '../service/mentorService.js'

const routes = express.Router()

routes.get('/',mentorService.getAllMentors)
routes.post('/',mentorService.createMentor)
routes.post('/assign', mentorService.assignStudentToMentor)
routes.get('/:mentorId/students', mentorService.getStudentsforAMentor)

export default routes