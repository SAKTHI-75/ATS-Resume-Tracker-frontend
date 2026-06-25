import React, { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import "../styles/ResumeScreener.css";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export default function ResumeScreener() {
  const [fileName, setFileName] = useState("");
  const [error, setError]       = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const ext       = "." + file.name.split(".").pop().toLowerCase();
    const validType = ALLOWED_TYPES.includes(file.type);
    const validExt  = ALLOWED_EXTENSIONS.includes(ext);

    if (!validType || !validExt) {
      setError(`"${file.name}" is not allowed. Please upload a PDF, DOC, or DOCX file only.`);
      setFileName("");
      e.target.value = "";
      return;
    }

    setError("");
    setFileName(file.name);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Resume Screener</h1>
        <button className="btn-primary">onClick={() => {
    if (!fileName) {
      setError("Please upload a resume first.");
      return;
    }
    setAnalyzed(true);
  }}✨ AI Screen</button>
      </div>

      <div className="card">
        {/* Upload area */}
        <label htmlFor="resume-upload" className="upload-area">
          <div className="upload-icon">☁️</div>
          <p>Drag & drop or <span>browse</span> to upload</p>
          <p className="upload-hint">Accepts .pdf, .doc, .docx only</p>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="file-input"
            onChange={handleUpload}
          />
        </label>

        {/* Error message */}
        {error && (
          <div className="upload-error">
            <span>⚠️</span> {error}
          </div>
        )}
        

        {/* Result */}
        {fileName && (
          <div>
            <div className="file-preview">
              <span className="file-icon">📄</span>
              <span className="file-name">{fileName}</span>
            </div>

            <div className="result-box">
              <h3>ATS Analysis</h3>

              <div className="result-row">
                <span className="result-label">Match score</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: "87%" }} />
                </div>
                <span className="score-text">87%</span>
              </div>

              <div className="result-row">
                <span className="result-label">Skills found</span>
                <div className="skill-tags">
                  {["React", "Node.js", "MongoDB"].map((sk) => (
                    <span key={sk} className="skill-tag">{sk}</span>
                  ))}
                </div>
              </div>

              <div className="result-row">
                <span className="result-label">Recommendation</span>
                <StatusBadge status="Recommended" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}