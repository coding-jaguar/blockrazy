import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ElectionList from "./components/ElectionsList";
import ElectionDetails from "./components/ElectionDetails";

const ManageElections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const getElections = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "elections"
        );
        setElections(response.data);
        console.log("electionData", response.data);
      } catch (error) {
        console.error("Error getting elections:", error);
      }
    };

    getElections();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="p-10">
      <div>
        <h1 className=" text-white my-10">Manage Elections</h1>
        <div className="flex justify-center gap-2 ">
          <button
            onClick={() => navigate("../create-election")}
            className="border-white border-4"
          >
            Create Election
          </button>
        </div>
      </div>
      <div className="mt-10">
        <Routes>
          <Route path="/" element={<ElectionList elections={elections} />} />
          <Route path="/elections/*" element={<ElectionDetails />} />
        </Routes>
      </div>
    </div>
  );
};
export default ManageElections;
