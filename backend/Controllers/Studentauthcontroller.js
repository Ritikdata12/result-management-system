const Student = require('../models/Student');
const Marks = require('../models/Marks');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const registerStudent = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        let student = await Student.findOne({ email });
        if (student) return res.status(400).json({ message: 'Student already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        student = new Student({
            name,
            email,
            password: hashedPassword,
        });

        await student.save();
        const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(token);
        res.status(201).json('Account created successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login a student
const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        let student = await Student.findOne({ email });
        if (!student) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(token);
        res.status(201).json({ email, password, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getStudentMarks = async (req, res) => {
    const { studentId } = req.query; // Extract studentId from query parameters

    try {
        const marks = await Marks.findOne({ studentId });

        if (!marks) {
            return res.status(404).json({ message: 'Marks not found for this student ID' });
        }

        res.json(marks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = { registerStudent, loginStudent, getStudentMarks };
