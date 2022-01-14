import React from 'react';
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import "./SCSS/Dashboard/Dashboard.css";

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                
            </div>
        </div>
    );
}

export default Dashboard;
