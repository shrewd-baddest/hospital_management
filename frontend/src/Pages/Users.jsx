import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData(); // data from getAllUsers

  const [usersData, setUsersData] = useState(loaderData || []);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  console.log(loaderData);
  const userSearch = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/webpages/userSearch",
        { search: value },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setUsersData(response.data.users);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="mb-2 text-2xl font-bold">Users</h1>
      <p className="mb-4">
        Manage all system users: search, view details, and perform
        administrative actions.
      </p>

      <div className="flex flex-row items-center justify-between w-full mb-4 gap-1/4">
        <button
          className="px-3 py-1 text-white bg-blue-500 rounded"
          onClick={() => navigate("/dashboard/register")}
        >
          Add New User
        </button>

        <div>
          {/* <MagnifyingGlassIcon className="inline w-8 h-8 mr-2 text-gray-500" /> */}
          <input
            type="text"
            placeholder="🔍Search users by name or email"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              userSearch(value);
            }}
            className="w-64 h-10 px-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">
              <UserIcon className="inline w-4 h-4 mr-1" /> Name
            </th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(usersData) && usersData.length > 0 ? (
            usersData.map((user) => (
              <tr key={user.email} className="transition hover:bg-gray-50">
                <td className="px-4 py-2">{user.full_name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.is_active ? "Active" : "Inactive"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

export const userLoader = async () => {
  try {
    const response = await fetch("http://localhost:3000/webpages/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
