const express = require('express');
const { registerStudent, loginStudent, getStudentMarks } = require('../Controllers/Studentauthcontroller')
const studentAuth = require('../middleware/studentauth');
const router = express.Router();

router.post('/register', registerStudent);

router.post('/login', loginStudent);

// router.get('/marks', studentAuth, getStudentMarks);
router.get('/marks', getStudentMarks);


module.exports = router;
