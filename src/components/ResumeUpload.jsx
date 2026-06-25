import React from "react";

function ResumeUpload() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ marginTop: "15px" }}
      />

      <br />
      <br />

      <button
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>
  );
}

export default ResumeUpload;