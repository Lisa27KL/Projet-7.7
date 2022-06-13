import React from "react";
import Logo3 from "../Common/img/icon3.svg";
// import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="header-container">
        <div className="headerLogoTitle">
          <div className="logo">
            <img src={Logo3} className="imgLogoGp" alt="Logo de Groupomania" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
