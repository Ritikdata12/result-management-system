const AdminModel  = require('../models/Admin');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let admin = await AdminModel.findOne({ email });
        if (admin) return res.status(400).json({ message: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new AdminModel({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);

        res.status(201).json("Account created successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let admin = await AdminModel.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);

        
        
        res.status(201).json("login successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {register,login};
