import React, { useEffect } from 'react';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";

import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import "./SCSS/Dashboard/Dashboard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
const Dashboard = () => {

  

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [0,4000],
            },
        ],
    };

    return (
        <div className='dashboard'>
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> Rs2000
                        </p>
                    </div>
                </div>

                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Products</p>
                        <p>50</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>4</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>4</p>
                    </Link>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
