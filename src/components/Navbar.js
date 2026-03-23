import React from 'react';

const NAV_LINKS = [
  { page: 'view-doctors',         label: 'View Doctors' },
  { page: 'view-specializations', label: 'View Specializations' },
  { page: 'view-todays-surgery',  label: "View Today's Surgery" },
  { page: 'add-doctor',           label: 'Add Doctor' },
];

export default function Navbar({ page, navigate }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">CureWell</span>
      {NAV_LINKS.map(({ page: pg, label }) => (
        <span
          key={pg}
          className={`nav-link ${page === pg ? 'active' : ''}`}
          onClick={() => navigate(pg)}
        >
          {label}
        </span>
      ))}
    </nav>
  );
}
