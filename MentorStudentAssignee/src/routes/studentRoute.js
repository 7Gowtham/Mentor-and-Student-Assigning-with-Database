import express from 'express'
import studentService from '../service/studentService.js'

const routes = express.Router()

routes.get('/', studentService.getAllStudents)
routes.post('/', studentService.createStudent)
routes.post('/:mentorId/:studentId', studentService.changeMentor)
routes.get('/:studentId/previous-mentor', studentService.getPreviouslyAssignedMentor)

export default routes