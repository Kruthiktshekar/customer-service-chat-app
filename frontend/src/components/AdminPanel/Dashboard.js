import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { AdminContext } from "../../contexts/AdminContext";

function Admin() {
  const navigate = useNavigate();

  const { adminState } = useContext(AdminContext);
 
  console.log(adminState)

  return (
    <div>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div
          className="card"
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          <h2>Total Users</h2>
          <p>{adminState.users.length}</p>
        </div>
        <div
          className="card"
          onClick={() => {
            navigate("/admin/agents");
          }}
        >
          <h2>Total Agents</h2>
          <p>{adminState.agents.length}</p>
        </div>
        <div
          className="card"
          onClick={() => {
            navigate("/admin/prompts");
          }}
        >
          <h2>Total Prompts</h2>
          <p>{adminState.prompts.length}</p>
        </div>

       
      </div>
    </div>
  );
}

export default Admin;
