import React, { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import InitialsAvatar from "../components/InitialsAvatar";
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// ── Stat cards config ──────────────────────────────────
const stats = [
  { label: "Total Candidates", value: null, icon: "👥", colorClass: "purple", sub: "No candidates yet" },
  { label: "Open Positions",   value: null, icon: "💼", colorClass: "green",  sub: "No roles posted"  },
  { label: "Shortlisted",      value: null, icon: "✅", colorClass: "amber",  sub: "None shortlisted" },
  { label: "Interviews",       value: null, icon: "🎯", colorClass: "rose",   sub: "None scheduled"   },
];

// ── Pipeline stages config ─────────────────────────────
const pipelineStages = [
  { name: "Applied",     count: 0, color: "#7F77DD" },
  { name: "Screened",    count: 0, color: "#3B82F6" },
  { name: "Interviewing",count: 0, color: "#F59E0B" },
  { name: "Offer Sent",  count: 0, color: "#22C55E" },
];

export default function Dashboard() {
  const [candidates]   = useState([]);   // empty — no sample data
  const [activities]   = useState([]);   // empty — no sample data
  const pieData = {
  labels: ["Applied", "Screened", "Interviewing", "Offer Sent"],
  datasets: [
    {
      data: [15, 10, 5, 2],
      backgroundColor: [
        "#7F77DD",
        "#3B82F6",
        "#F59E0B",
        "#22C55E",
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    <div>
      {/* Welcome banner */}
      <div className="welcome-banner">
        <div>
          <h2>Welcome to your ATS Dashboard</h2>
          <p>Post a role or upload resumes to get started.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn-white">+ Post a role</button>
          <button className="btn-white-solid">Upload resumes</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${s.colorClass}`}>
            <div className="stat-top">
              <span className="stat-label">{s.label}</span>
              <div className={`stat-icon ${s.colorClass}`}>{s.icon}</div>
            </div>
            <div>
              <div className={`stat-value ${s.value === null ? "empty" : ""}`}>
                {s.value !== null ? s.value : "—"}
              </div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline stages */}
      <div className="pipeline-row">
        {pipelineStages.map((stage, i) => (
          <div key={i} className="pipeline-stage">
            <div className="pipeline-stage-info">
              <div className="stage-name">{stage.name}</div>
              <div className="stage-count">{stage.count}</div>
            </div>
            <div className="stage-indicator" style={{ background: stage.color + "33", border: `2px solid ${stage.color}` }} />
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="dashboard-grid">

      {/* Recruitment Analytics */}
      <div className="section-card">
        <div className="section-card-header">
          <h2>Recruitment Analytics</h2>
        </div>

        <div
          style={{
            width: "100%",
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pie data={pieData} />
        </div>
      </div>

        {/* Activity feed */}
        <div className="section-card">
          <div className="section-card-header">
            <h2>Activity</h2>
          </div>

          {activities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h4>No activity yet</h4>
              <p>Actions like uploads, shortlists, and interviews will appear here.</p>
            </div>
          ) : (
            <div className="activity-feed">
              {activities.map((a, i) => (
                <div key={i} className="activity-entry">
                  <div className={`activity-dot ${a.color}`} />
                  <div className="activity-body">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}