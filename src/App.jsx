import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ResumeScreener from "./pages/ResumeScreener";
import HiringRoles from "./pages/HiringRoles";
import Candidates from "./pages/Candidates";
import "./styles/global.css";

const pages = [
  { id: "dashboard",  label: "Dashboard",       icon: "🏠", component: <Dashboard />      },
  { id: "screener",   label: "Resume Screener", icon: "🔍", component: <ResumeScreener /> },
  { id: "roles",      label: "Hiring Roles",    icon: "💼", component: <HiringRoles />    },
  { id: "candidates", label: "Candidates",      icon: "👥", component: <Candidates />     },
];

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const current = pages.find((p) => p.id === activePage);

  return (
    <div className="shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>●</span> ATS Portal
        </div>

        {pages.map((p) => (
          <div
            key={p.id}
            className={`nav-item ${activePage === p.id ? "active" : ""}`}
            onClick={() => setActivePage(p.id)}
          >
            <span className="nav-icon">{p.icon}</span>
            {p.label}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h1>{current.label}</h1>
          <div className="topbar-right">
            <div className="notif-btn">🔔</div>
            <div className="avatar">HR</div>
          </div>
        </div>

        {/* Page content */}
        <div className="content">{current.component}</div>
      </div>
    </div>
  );
}