const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const authRoutes = require('./routes/Authroutes');
const adminRoutes = require('./routes/Adminroutes');
const studentRoutes = require("./routes/Studentroutes")

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
