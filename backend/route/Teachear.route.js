const express = require('express');
const router = express.Router();
const { register,login} = require("../controller/teacher.controller.js");

// route.get("/teacher/registration", register);

router.post('/student/register', register);
router.post("/teacher/login", login);
// route.patch('/changePassword', changePassword);
// route.get('/getAllTeachers', getAllTeachers);


module.exports = router;