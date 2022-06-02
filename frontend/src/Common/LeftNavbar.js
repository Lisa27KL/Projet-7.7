import React from "react";
import { NavLink } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsNewspaper } from "react-icons/bs";


const LeftNav = () => {
  return (
    <div className="leftNav-container">
      <nav className="navBar">
        <NavLink to="/profile">
          <button className="nav-button">
            <CgProfile />
          </button>
        </NavLink>

        <NavLink to="/posts">
          <button className="nav-button">
            <BsNewspaper />
          </button>
        </NavLink>

        <NavLink to="/">
          <button className="nav-button">
            <FaPowerOff />
          </button>
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftNav;
