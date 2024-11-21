import React from "react";
import "../../src/Pages/styles/landing.css";
import Nav from "../components/nav";
import Result from "../components/result";

export default function LandingPage() {
  return (
    <div>
      <Nav />

      <div className="title section">
        <Result />
      </div>
      {/* 
      <div className="latest-update section">
        <p>latest update</p>
      </div> */}
    </div>
  );
}
