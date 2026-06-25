import React from "react";

function Settings() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Settings</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h3>Company Information</h3>

        <p>Company: Resume ATS</p>
        <p>Email: hr@company.com</p>
        <p>Plan: Enterprise</p>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h3>Notifications</h3>

        <label>
          <input type="checkbox" defaultChecked />
          Email Notifications
        </label>

        <br />
        <br />

        <label>
          <input type="checkbox" defaultChecked />
          Interview Alerts
        </label>
      </div>
    </div>
  );
}

export default Settings;