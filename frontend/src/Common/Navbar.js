import React from "react";
import { NavLink } from "react-router-dom";
import goOut from "../Common/img/ImOut.png";
import profile from "../Common/img/profile.png";
import newsPaper from "../Common/img/newspaper1.png";

const NavBar = () => {

  const logout = () => {
    sessionStorage.removeItem("user")
  };
  
  return (

    <div className="NavBar-container">
      <nav className="navBar">
        <NavLink to="/profile">
          <button className="nav-button">
          <img src={profile} alt="myProfile" id="myProfileBtn" />
          </button>
        </NavLink>


        <NavLink to="/posts">
          <button className="nav-button">
            <img src={newsPaper} alt="Actuality" id="ActualityBtn" />
          </button>
        </NavLink>


        <NavLink to="/">
          <button className="nav-button"
          onClick={()=>{logout()}}>
            <img src={goOut} alt="LogOut" id="ImOutBtn"/>
          </button>
        </NavLink>


      </nav>
    </div>
  );
};
export default NavBar;
