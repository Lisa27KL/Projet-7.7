import React from "react";
import linkedin from "../Common/img/linkedin.webp";
import twitter from "../Common/img/twitter.webp"
import facebook from "../Common/img/facebook.webp";
import instagram from "../Common/img/instagram.webp";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="h3-footer">
        <h3 className="footer-title">Nos Partenariats </h3>
      </div>
      <div className="links-footer">
        <ul className="links-icons-footer">
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
        </ul>
      </div>
    </div>
  );
};
export default Footer;
