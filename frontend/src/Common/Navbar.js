import React from "react";
import { NavLink } from "react-router-dom";
import goOut from "../Common/img/ImOut.webp";
import profile from "../Common/img/profile.webp";
import newsPaper from "../Common/img/newspaper1.webp";

const NavBar = () => {
  const logout = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <div className="NavBar-container">
      <nav className="navBar">
        <NavLink to="/profile">
          <div className="nav-button">
            <img src={profile} alt="myProfile" className="myProfileBtn" />
          </div>
        </NavLink>

        <NavLink to="/posts">
          <div className="nav-button">
            <img src={newsPaper} alt="Actuality" className="ActualityBtn" />
          </div>
        </NavLink>

        <NavLink to="/">
          <div className="nav-button">
            <img src={goOut} alt="LogOut" className="ImOutBtn" onClick={() => {
              logout()}} />
          </div>
        </NavLink>
      </nav>
    </div>
  );
};
export default NavBar;
