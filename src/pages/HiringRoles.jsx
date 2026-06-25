import React, { useState, useEffect } from "react";
import "../styles/HiringRoles.css";

const API_BASE = "http://localhost:5000/api/jobs";

const EMPTY_FORM = {
  title:          "",
  description:    "",
  skillsRequired: "",   // comma-separated in the input, split on submit
  openings:       "",
  status:         "Open",
};

export default function HiringRoles() {
  const [roles,       setRoles]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [editRole,    setEditRole]    = useState(null);   // null = add, object = edit
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [submitting,  setSubmitting]  = useState(false);
  const [formError,   setFormError]   = useState("");

  // ── Fetch all jobs ──────────────────────────────────
  const fetchRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(API_BASE);
      const data = await res.json();
      if (data.success) setRoles(data.data);
      else setError(data.message || "Failed to load roles");
    } catch {
      setError("Could not connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  // ── Open modal ──────────────────────────────────────
  const openAdd = () => {
    setEditRole(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowModal(true);
  };

  const openEdit = (role) => {
    setEditRole(role);
    setForm({
      title:          role.title,
      description:    role.description || "",
      skillsRequired: (role.skillsRequired || []).join(", "),
      openings:       role.openings,
      status:         role.status || "Open",
    });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditRole(null);
    setFormError("");
  };

  // ── Handle form input ───────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Submit (create or update) ───────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim()) return setFormError("Role title is required.");
    if (!form.openings || Number(form.openings) < 1)
      return setFormError("Openings must be at least 1.");

    const payload = {
      title:          form.title.trim(),
      description:    form.description.trim(),
      skillsRequired: form.skillsRequired
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      openings: Number(form.openings),
      status:   form.status,
    };

    setSubmitting(true);
    try {
      const url    = editRole ? `${API_BASE}/${editRole._id}` : API_BASE;
      const method = editRole ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        await fetchRoles();
        closeModal();
      } else {
        setFormError(data.message || "Something went wrong.");
      }
    } catch {
      setFormError("Could not connect to server.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this role?")) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      setRoles((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete. Try again.");
    }
  };

  // ── Status badge color ──────────────────────────────
  const statusClass = (status) =>
    status === "Open" ? "role-status open" : "role-status closed";

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1>Hiring roles</h1>
          <p className="page-sub">
            {roles.length > 0
              ? `${roles.length} role${roles.length > 1 ? "s" : ""} posted`
              : "No roles posted yet"}
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          + Add role
        </button>
      </div>

      {/* Error banner */}
      {error && <div className="fetch-error">⚠️ {error}</div>}

      {/* Loading */}
      {loading && (
        <div className="roles-loading">
          <div className="spinner" />
          Loading roles…
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && roles.length === 0 && (
        <div className="roles-empty">
          <div className="empty-icon-box">💼</div>
          <h3>No roles posted yet</h3>
          <p>Add your first open position to start receiving applications.</p>
          <button className="btn-primary" onClick={openAdd}>
            + Add your first role
          </button>
        </div>
      )}

      {/* Role cards */}
      {!loading && roles.length > 0 && (
        <div className="role-list">
          {roles.map((role) => (
            <div key={role._id} className="role-card">
              {/* Left: info */}
              <div className="role-info">
                <div className="role-title-row">
                  <h3>{role.title}</h3>
                  <span className={statusClass(role.status)}>{role.status}</span>
                </div>
                {role.description && (
                  <p className="role-desc">{role.description}</p>
                )}
                {role.skillsRequired?.length > 0 && (
                  <div className="role-skills">
                    {role.skillsRequired.map((sk) => (
                      <span key={sk} className="role-skill-tag">{sk}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Center: meta */}
              <div className="role-meta">
                <div className="role-meta-item">
                  <div className="meta-value">{role.openings}</div>
                  <div className="meta-label">Openings</div>
                </div>
                <div className="role-meta-item">
                  <div className="meta-value">{role.applicants ?? 0}</div>
                  <div className="meta-label">Applicants</div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="role-actions">
                <button className="btn" onClick={() => openEdit(role)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(role._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────── */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h2>{editRole ? "Edit role" : "Add new role"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>

              {formError && <div className="form-error">⚠️ {formError}</div>}

              <div className="form-group">
                <label>Role title <span className="required">*</span></label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. React Developer"
                  value={form.title}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Brief description of the role..."
                  value={form.description}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Openings <span className="required">*</span></label>
                  <input
                    type="number"
                    name="openings"
                    placeholder="1"
                    min="1"
                    value={form.openings}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Skills required</label>
                <input
                  type="text"
                  name="skillsRequired"
                  placeholder="React, Node.js, MongoDB  (comma separated)"
                  value={form.skillsRequired}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting
                    ? "Saving…"
                    : editRole
                    ? "Save changes"
                    : "Add role"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}