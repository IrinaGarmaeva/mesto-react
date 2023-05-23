import React from "react";
import logoImage from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logoImage} alt="логотип" className="header__logo" />
    </header>
  );
}

export default Header;
