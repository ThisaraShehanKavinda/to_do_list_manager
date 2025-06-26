import React from "react";
import "./StatusFilter.css";

const StatusFilter = ({ filterStatus, setFilterStatus }) => {
  const statuses = ["All", "Complete", "Incomplete"];

  return (
    <div className="status-filter">
      {statuses.map((status) => (
        <button
          key={status}
          className={`filter-button ${filterStatus === status ? "active" : ""}`}
          onClick={() => setFilterStatus(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
