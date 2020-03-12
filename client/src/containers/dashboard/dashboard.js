import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Your Dashboard</h1>
                <NavLink
                    to="questionadder"
                    exact>Add Question</NavLink>
                    <br />
                <a
                href="http://localhost:5000/requestPermission">Request to be a teacher</a>
            </div>
        );
    }
}

export default Dashboard;