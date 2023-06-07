import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer container">
      <p className="footer__text">&copy; {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
