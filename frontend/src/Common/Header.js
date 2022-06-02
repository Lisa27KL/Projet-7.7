import React from "react";
import Logo3 from "../Common/img/icon3.svg";
import { NavLink } from "react-router-dom";
//import { CgLogIn, CgLogOut } from "react-icons/cg";

const Header = () => {
  return (
    <nav>
      <div className="header-container">
        <div className="headerLogoTitle">
          <NavLink to="/">
            <div className="logo">
              <img
                src={Logo3}
                className="imgLogoGp"
                alt="Logo de Groupomania"
              />
            </div>
          </NavLink>
        </div>
        {/* <ul>
            <li className="welcomeUser">
              <NavLink to="/profil">
                {" "}
                <CgLogIn />
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <div className="logoLogOut">
                <h4>Mes Salutations </h4>

                <NavLink to="/profil">
                  <CgLogOut />
                </NavLink>
              </div>
            </li>
          </ul> */}
      </div>
    </nav>
  );
};

export default Header;
