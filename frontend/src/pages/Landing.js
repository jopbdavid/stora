import React from "react";
import Wrapper from "../assets/wrappers/LandingPage.js";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import educator from "../assets/images/educator.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Gestão <span>Docente</span> Integrada
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            commodi doloremque porro quasi ratione exercitationem cumque eveniet
            tempore at, odit hic nobis numquam quas ipsum alias facere,
            perspiciatis quos similique.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={educator} alt="teacher" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
