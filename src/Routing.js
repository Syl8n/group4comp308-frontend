import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import PatientMenu from './components/Patient/PatientMenu';
import NurseMenu from './components/Nurse/NurseMenu';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={AuthPage} />
        <Route exact path="/patient/:id" component={PatientMenu} />
        <Route exact path="/nurse/:id" component={NurseMenu} />
      </Routes>
    </Router>
  );
}

export default Routing;