import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { StatCard } from "./Dashboards/Components";
import { UserGroupIcon } from "@heroicons/react/24/outline";

const WardBed = () => {
  const [description, setDescription] = useState(null);

  const data = useLoaderData();

  const wards = data.wards;

  const [activeWard, setActiveWard] = useState(wards[0]?.name);

  const allBeds = description?.beds || [];

  useEffect(() => {
    const Bed_data = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/webpages/ward_beds/description?ward=${activeWard}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const res = await response.json();

        setDescription(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (activeWard) {
      Bed_data();
    }
  }, [activeWard]);

  return (
    <div>
      <h2>Ward & Bed Management</h2>

      <section>
        <label>Select Ward</label>

        <select
          value={activeWard}
          onChange={(e) => setActiveWard(e.target.value)}
        >
          {wards &&
            wards.map((item, idx) => (
              <option value={item.name} key={idx}>
                {item.name}
              </option>
            ))}
        </select>
      </section>

      <section>
        <h2>Ward Overview: {activeWard}</h2>

        <div>
          <StatCard title="Total Beds" value={data.total_beds} />
          <StatCard title="Vacant Beds" value={data.vacant} />
          <StatCard title="Occupied Beds" value={data.occupied} />
          <StatCard title="Clearing Needed" value={data.clearing} />
        </div>
      </section>

      <section>
        <h3>Ward Layout: {activeWard}</h3>

        {allBeds.map((item, idx) => (
          <div key={idx}>
            <h2>{item.bed_no}</h2>

            <h3>{item.status}</h3>

            {item.patient && (
              <div>
                <UserGroupIcon className="w-6 h-6" />
                patient: {item.patient}
              </div>
            )}

            <button>
              {item.status === "occupied"
                ? "Unassign Patient"
                : "Assign Patient"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default WardBed;

export const bedLoarder = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/webpages/ward_beds",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error.message;
  }
};