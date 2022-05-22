import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Header from './components/Header'

function App() {
  return (
    < >
      <Router>
        <LandingPage>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </LandingPage>
      </Router>
    </>
  );
}

export default App;
