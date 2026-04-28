import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/webpages/doctor/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/dashboard/${data.data.id}`, {
          state: { role: data.data.role },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate, role]);

  return <div>Profile</div>;
};

export default Profile;
