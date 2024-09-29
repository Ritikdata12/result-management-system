import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/students/register',
        {
          name,
          email,
          password,
        }
      );

      console.log('Response from server:', response);

      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed.');
        console.log('Registration failed response:', response.data);
      }
    } catch (err) {
      alert('Error during registration: ' + err.message);
    } finally {
      setTimeout(() => {
        setLoading(false); 
      }, 2000);
    }
  };

  return (
    <>
      <div className="cont1">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="box1 p-4 shadow rounded">
            <h2 className="text-center mb-4 text-primary">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mb-3"
                />
              </Form.Group>
              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                <Button variant="secondary" onClick={handleClick} disabled={loading}>
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Container>
        
      </div>
    </>
  );
};

export default Register;