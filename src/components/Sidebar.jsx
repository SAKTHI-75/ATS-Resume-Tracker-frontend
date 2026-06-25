import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>ATS Dashboard</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/resume-screener">Resume Screener</Link>
      <Link to="/candidates">Candidates</Link>
      <Link to="/resumes">Resumes</Link>
      <Link to="/roles">Hiring Roles</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default Sidebar;