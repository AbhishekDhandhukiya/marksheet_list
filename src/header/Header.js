import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="link-app">
        <Link to="/ifcondition">Incre/Decre</Link>
        <Link to="/marksheet">MarkSheet</Link>
        <Link to="/list">List</Link>
      </div>
    </div>
  );
};

export default Header;
