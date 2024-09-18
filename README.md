# Mentor and Student Assigning with Database

## Contents
- [Description](#description)
- [Functionalities Used](#functionalities-used)
- [API Endpoints](#api-endpoints)

## Description
This project demonstrates how to write APIs for Mentor and Student Assigning with Database.

### Functionalities Used
1. Created `express` server to handle http requests and responses.
2. Utilized `mongoose` is to simplify and structure the interaction between a Node.js application and a MongoDB database. It serves as an ODM (Object Data Modeling) library.
3. Utilized `dotenv` to secure the environment variables.

### API Endpoints
1. To create Mentor - https://mentor-and-student-assigning-with-2wuw.onrender.com/mentor
2. To create Student - https://mentor-and-student-assigning-with-2wuw.onrender.com/student
3. To assign a student to mentor - https://mentor-and-student-assigning-with-2wuw.onrender.com/mentor/assign
4. To assign or change mentor for a particular student - https://mentor-and-student-assigning-with-2wuw.onrender.com/student/:mentorId/:studentId
5. To show all students for a particular mentor - https://mentor-and-student-assigning-with-2wuw.onrender.com/mentor/:mentorId/students
6. To show the previously assigned mentor for a particular student - https://mentor-and-student-assigning-with-2wuw.onrender.com/student/:studentId/previous-mentor
