import express from 'express'
import mentorRoutes from './mentorRoute.js'
import studentRoutes from './studentRoute.js'

const routes = express.Router()

routes.get('/',(req, res)=>{
    res.status(200).send(
        `<h1>Welcome to Backend of Mentor Student Assignee DB</h1>`
    )
})

routes.use('/mentor', mentorRoutes)
routes.use('/student', studentRoutes)

export default routes