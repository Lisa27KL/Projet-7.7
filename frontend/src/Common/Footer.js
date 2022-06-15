import React from "react";
import linkedin from "../Common/img/linkedin.png";
import twitter from "../Common/img/twitter.png";
import facebook from "../Common/img/facebook.png";
import instagram from "../Common/img/instagram.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="h3-footer">
        <h3 className="footer-title">Nos Partenariats </h3>
      </div>
      <div className="links-footer">
        {/* <ul /> */}
        <li>
          <a
            href="https://fr.linkedin.com/"
            className="icons-footer"
            target="blank"
          >
            <img src={linkedin} alt="linkedin" className="socialIcons" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/"
            className="icons-footer"
            target="blank"
          >
            <img src={twitter} alt="twitter" className="socialIcons" />
          </a>
        </li>
        <li>
          <a
            href="https://facebook.com/"
            className="icons-footer"
            target="blank"
          >
          <img src={facebook} alt="facebook" className="socialIcons" />
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/"
            className="icons-footer"
            target="blank"
          >
            <img src={instagram} alt="instagram" className="socialIcons" />
          </a>
        </li>
      </div>
    </div>
  );
};
export default Footer;
