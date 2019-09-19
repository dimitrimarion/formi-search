import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import logo from "../assets/img/logo100x100.png";

const App = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="FormiSearch logo" />
        <nav>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-menu-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-menu-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-menu-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

render(<App />, document.getElementById("root"));
