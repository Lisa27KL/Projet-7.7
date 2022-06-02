import React from "react";
import { FiLinkedin, FiTwitter, FiFacebook, FiDribbble } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="h3-footer">
        <h3 id="footer-title">Nos Partenariats </h3>
      </div>
      <div className="links-footer">
        {/* <ul /> */}
        <li>
          <a
            href="https://fr.linkedin.com/"
            className="icons-footer"
            target="blank"
          >
            <FiLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/"
            className="icons-footer"
            target="blank"
          >
            <FiTwitter />
          </a>
        </li>
        <li>
          <a
            href="https://facebook.com/"
            className="icons-footer"
            target="blank"
          >
            <FiFacebook />
          </a>
        </li>
        <li>
          <a
            href="https://dribbble.com/"
            className="icons-footer"
            target="blank"
          >
            <FiDribbble />
          </a>
        </li>
      </div>
    </div>
  );
};
export default Footer;
