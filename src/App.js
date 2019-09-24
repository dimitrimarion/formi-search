import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import logo from "../assets/img/logo100x100.png";
import Search from "./Search";
import Results from "./Results";
import Details from "./Details";
import Contact from "./Contact";

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
              <Link to="/contact" className="nav-menu-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Router>
        <Search path="/" />
        <Results path="results/:country/:speciesName/page/:pageId" />
        <Details path="details/:specId" />
        <Contact path="contact" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
