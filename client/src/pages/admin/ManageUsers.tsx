import { Route, Routes, useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  interface User {
    id: number;
    username: string;
    userType: string;
    publicKey?: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "users"
        );
        console.log("jhello");

        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    getAllUsers();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <h1 className="my-10">Manage Users</h1>
      <div className="flex mb-10 gap-5 justify-center">
        <button
          onClick={() => {
            navigate("add-candidate");
          }}
          className="text-black bg-white"
        >
          Add user
        </button>
        <button onClick={() => navigate("./")} className="text-black bg-white">
          All user
        </button>
      </div>

      <Routes>
        <Route path="/" element={Component(users)} />
        <Route path="/add-candidate" element={<CreateUser />} />
      </Routes>
    </div>
  );
};

const Component = (users: any) => {
  return (
    <ul className="p-6 shadow-lg rounded-lg space-y-4 m-10 text-white">
      {users.map((user) => (
        <li
          key={user.id}
          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
        >
          <p className="text-lg font-semibold text-gray-200">
            <span className="font-bold">Username:</span> {user.username}
          </p>
          <p className="">
            <span className="">User Type:</span> {user.userType}
          </p>
          <p className="">
            <span className="font-bold">Public Key:</span>{" "}
            {user.publicKey || "N/A"}
          </p>
        </li>
      ))}
    </ul>
  );
};
export default ManageUsers;
