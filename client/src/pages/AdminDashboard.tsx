import React from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import ManageUsers from "./admin/ManageUsers";
import ManageElections from "./admin/ManageElections";
import CreateElection from "./admin/CreateElection";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className=" bg-black bg-opacity-50"
      style={{
        width: "1600px",
        backgroundImage:
          "url('https://rejolut.com/wp-content/uploads/2022/02/voting7.png')",
      }}
    >
      <div className="w-full bg-black bg-opacity-80">
        <div className="flex justify-between px-10 py-4 bg-black mb-10">
          <div>
            <h1 style={{ float: "left" }}>Admin Dashboard</h1>
          </div>
          <div className="flex">
            <button
              onClick={() => {
                navigate("manage-elections");
              }}
              className="text-black bg-white mr-5"
            >
              Manage Elections
            </button>
            <button
              onClick={() => navigate("manage-users")}
              className="text-black bg-white"
            >
              Manage Users
            </button>
          </div>
        </div>
        <Routes>
          <Route path="/manage-elections/*" element={<ManageElections />} />
          <Route path="/manage-users/*" element={<ManageUsers />} />
          <Route path="/create-election" element={<CreateElection />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
