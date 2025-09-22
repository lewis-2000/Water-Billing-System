import React from "react";
import Tap from "../assets/tap.png";

const Home = () => {
  return (
    <div className="home-view">
      <div className="salutations">
        <div className="salutations-heading">
          <p className="welcome-text">
            Welcome Back, <span className="username">User!</span>
          </p>
          <p className="home-quote">
            "Here’s a summary of your account activity."
          </p>
        </div>

        <div className="salutations-image">
          <img src={Tap} alt="Tap pouring water" />
        </div>
      </div>
    </div>
  );
};

export default Home;
