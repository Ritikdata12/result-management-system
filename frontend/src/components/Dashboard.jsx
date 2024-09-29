import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [marks, setMarks] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: token,
                    },
                };
                const res = await axios.get('http://localhost:3001/api/students/marks', config);
                setMarks(res.data);
            } catch (err) {
                setError('Error fetching marks');
            }
        };

        fetchMarks();
    }, []);

    return (
        <div className="container">
            <h2>Student Dashboard</h2>
            {error && <p className="text-danger">{error}</p>}
            <ul>
                <li>Attendance Marks: {marks.attendanceMarks}</li>
                <li>Project Review Marks: {marks.projectReviewMarks}</li>
                <li>Assessment Marks: {marks.assessmentMarks}</li>
                <li>Project Submission Marks: {marks.projectSubmissionMarks}</li>
                <li>LinkedIn Post Marks: {marks.linkedInPostMarks}</li>
                <li>Total Marks: {marks.totalMarks}</li>
            </ul>
        </div>
    );
};

export default Dashboard;
