import React from "react";

function Resumes() {
  const resumes = [
    {
      id: 1,
      candidate: "John Doe",
      role: "React Developer",
      score: 92,
      status: "Shortlisted",
    },
    {
      id: 2,
      candidate: "Jane Smith",
      role: "Python Developer",
      score: 88,
      status: "Interview",
    },
    {
      id: 3,
      candidate: "Michael Brown",
      role: "Node.js Developer",
      score: 95,
      status: "Selected",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resumes</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th align="left">Candidate</th>
              <th align="left">Role</th>
              <th align="left">ATS Score</th>
              <th align="left">Status</th>
              <th align="left">Resume</th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id}>
                <td>{resume.candidate}</td>
                <td>{resume.role}</td>
                <td>{resume.score}%</td>
                <td>{resume.status}</td>
                <td>
                  <button>View Resume</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Resumes;