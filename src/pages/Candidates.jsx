import React from "react";
import StatusBadge from "../components/StatusBadge";
import InitialsAvatar from "../components/InitialsAvatar";
import "../styles/Candidates.css";

const candidates = [
  { id: 1, name: "John Doe",      role: "React Developer",  experience: 3, score: 92, status: "Shortlisted", avatarBg: "#EDE9FE", avatarColor: "#5B21B6" },
  { id: 2, name: "Jane Smith",    role: "Python Developer", experience: 2, score: 88, status: "Interview",   avatarBg: "#FEF3C7", avatarColor: "#92400E" },
  { id: 3, name: "Michael Brown", role: "Node Developer",   experience: 4, score: 95, status: "Selected",   avatarBg: "#DCFCE7", avatarColor: "#166534" },
];

export default function Candidates() {
  return (
    <div>
      <div className="page-header">
        <h1>Candidates</h1>
        <button className="btn-primary">⚙ Filter</button>
      </div>

      <div className="candidates-table-wrap">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Experience</th>
              <th>Score</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="candidate-name-cell">
                    <InitialsAvatar
                      name={c.name}
                      bg={c.avatarBg}
                      color={c.avatarColor}
                    />
                    {c.name}
                  </div>
                </td>
                <td>{c.role}</td>
                <td>{c.experience} yrs</td>
                <td>
                  <span className="score-pill">⭐ {c.score}%</span>
                </td>
                <td>
                  <StatusBadge status={c.status} />
                </td>
                <td>
                  <button className="btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}