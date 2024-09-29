import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Student = () => {
    const [studentId, setStudentId] = useState('');
    const [marks, setMarks] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setError('');
        setLoading(true);
        setMarks(null); 
    
        const token = localStorage.getItem('token');
        console.log(token);
    
        try {
            const response = await axios.get(
                `http://localhost:3001/api/students/marks?studentId=${studentId}`
            );
    
            setMarks(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };
    

    return (
        <Container className="mt-5">
            <h2>Check Your Marks</h2>

            <Form>
                <Form.Group controlId="studentId" className="my-3">
                    <Form.Label>Enter Student ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </Form>

            {error && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}

            {marks && (
                <div className="mt-4">
                    <h4>Marks Details:</h4>
                    <ul>
                        <li><strong>Student ID:</strong> {marks.studentId}</li>
                        <li><strong>Attendance Marks:</strong> {marks.attendenceMarks}</li>
                        <li><strong>Project Review Marks:</strong> {marks.projectReviewMarks}</li>
                        <li><strong>Assessment Marks:</strong> {marks.assessmentMarks}</li>
                        <li><strong>Project Submission Marks:</strong> {marks.projectSubmissionMarks}</li>
                        <li><strong>LinkedIn Post Marks:</strong> {marks.linkedInPostMarks}</li>
                        <li><strong>Total Marks:</strong> {marks.totalMarks}</li>
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default Student;
