import React from 'react';
import { Navbar, Nav,  Button, Container } from 'react-bootstrap';
import {  useNavigate, NavLink } from 'react-router-dom';
import cookie from 'js-cookie';
import DailyTips from './DailyTips';
import PatientMenu from './PatientMenu';

const PatientHomePage = () => {

    return (
        <div>
            <PatientMenu />
            <DailyTips />
            {/* Add your page content here */}
        </div>
    );
};

export default PatientHomePage;
