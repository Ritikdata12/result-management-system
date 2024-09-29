import { useState } from 'react'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Student from './components/Student';


export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
});

function App() {

  const [user, setUser] = useState(undefined);

  return (
    <>
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='/dash' element={<AdminDashboard/>}/>
          <Route path='/student' element={<Student/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </>
  )
}

export default App
