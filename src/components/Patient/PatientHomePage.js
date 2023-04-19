import React from 'react';
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
