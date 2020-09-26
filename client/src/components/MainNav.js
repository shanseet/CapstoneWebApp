import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.svg";

function MainNav() {

    const items = [
        { name: "DASHBOARD", route: "/" },
        { name: "PRACTICE HISTORY", route: "/practice-history" },
        { name: "MOVE INSIGHTS", route: "/move-insights" },
        { name: "START PRACTICE", route: "/start" }
    ];

    const navItems = items.map((item) => {
        return (
            <NavLink
                to={item.route}
                key={item.name}
                exact
                activeStyle={{ color: "#FFA21C", fontWeight: 600 }}
                className="nav-link"
            >
                {item.name}
            </NavLink>
        )
    });

    return (
        <div style={{ height: "5rem" }}>
            <Navbar fixed="top" style={{ color: "#FAFAFA", backgroundColor: "#2F4858" }}>
                <div className="container justify-content-start">
                    <Navbar.Brand>
                        <img
                            src={logo} alt="logo"
                            width="38" height="38"
                        />
                    </Navbar.Brand>
                    {navItems}
                </div>
            </Navbar>
        </div>
    )
}

export default MainNav;