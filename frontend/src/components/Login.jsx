import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/students/login', {
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token); 
        console.log(response.data);
        alert('Login successful');
        setUser(email); 
        // navigate('/dashboard'); 
      } else {
        alert('Login failed. Please check your credentials.');
        console.log('Login failed response:', response.data);
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.data) {
        alert('Something went wrong, please check your credentials.');
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="cont1">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="box1 p-4 shadow rounded">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                className="mb-3"
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Checking...' : 'Login'}
              </Button>
              <Button variant="secondary" onClick={handleRegisterClick} disabled={loading}>
                Register
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
