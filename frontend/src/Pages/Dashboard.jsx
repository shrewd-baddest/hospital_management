import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  FunnelIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Linegraph from "../assets/Linegraph";

const Dashboard = () => {
  // const role=localStorage.getItem('role');
  const adminData = useLoaderData().overview;
  const role = "admin";
  console.log(adminData);
  const patients = adminData.totalPatients;
  const admissions = adminData.admissions;
  const emptyBeds = adminData.totalEmptyBeds;
  const occupiedBeds = adminData.totalOccupiedBeds;
  const activities = adminData.recentActivities;
  const roleBasedDashboard = () => {
    switch (role) {
      case "admin": {
        return (
          <div className="max-w-full m-0">
            <div className="flex flex-row flex-wrap flex-shrink-0 w-full gap-4 scroll-m-0 md:flex-nowrap md:overflow-auto no-scrollbar">
              <section className="grid w-1/4 grid-cols-1 p-5 text-lg rounded-md shadow-md min-w-fit">
                <p className="text-xl">
                  Total Patients <UserGroupIcon className="inline w-12 h-12" />
                </p>
                <h2 className="font-bold text-black">{patients}</h2>
                <p className="text-xl">currently adimitted or registered</p>
              </section>
              <section className="grid w-1/4 grid-cols-1 p-5 text-lg rounded-md shadow-md min-w-fit">
                <p className="text-xl">
                  Today Admissions <FunnelIcon className="inline w-12 h-12" />
                </p>
                <h2 className="font-bold text-black">{admissions}</h2>
                <p className="text-xl">since last 24hours</p>
              </section>
              <section className="grid w-1/4 grid-cols-1 p-5 text-lg rounded-md shadow-md min-w-fit">
                <p className="text-xl">
                  Available Beds{" "}
                  <BuildingStorefrontIcon className="inline w-12 h-12" />
                </p>
                <h2 className="font-bold text-black">{emptyBeds}</h2>
                <p className="text-xl">Across all departments</p>
              </section>
              <section className="grid w-1/4 grid-cols-1 p-5 text-lg rounded-md shadow-md min-w-fit">
                <p className="text-xl">
                  Occupied Beds{" "}
                  <ClipboardDocumentCheckIcon className="inline w-12 h-12" />
                </p>
                <h2 className="font-bold text-black">{occupiedBeds}</h2>
                <p className="text-xl">Total currently occupied</p>
              </section>
            </div>
            <div>
              <h4 className="mt-10 mb-5 text-2xl font-bold text-slate-900">
                Admissions Trend
              </h4>
              <p className="mb-5 text-lg">
                Monthly patient admissions and discharges
              </p>

              <Linegraph />
            </div>
            <div className="flex flex-row gap-[20%] ">
              <section className="grid grid-cols-1">
                <h4 className="font-semibold">Quick Actions</h4>
                <button className="flex flex-row gap-2 p-2 m-2 font-semibold text-white bg-blue-600 rounded-md w-fit">
                  <UserPlusIcon className="inline w-5 h-4" />
                  <h5>Add New Patient</h5>
                </button>
                <button className="flex flex-row gap-2 p-2 m-2 font-semibold text-white bg-blue-600 rounded-md w-fit">
                  <ClipboardIcon className="inline w-5 h-4" />
                  <h5>Schedule Appointment</h5>
                </button>
                <button className="flex flex-row gap-2 p-2 m-2 font-semibold text-white bg-blue-600 rounded-md w-fit">
                  <ChartBarIcon className="inline w-5 h-4" />
                  <h5>View All Report</h5>
                </button>
              </section>
              <section>
                <h4 className="font-semibold">Recent Activities</h4>
                {activities.map((item) => (
                  <div className="flex flex-row gap-3">
                    <p>{item.time}</p>
                    <p>{item.activity}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        );
      }
    }
  };

  return <div>{roleBasedDashboard()}</div>;
};

export default Dashboard;

export const dashboardLoader = async () => {
  try {
    const response = await fetch("http://localhost:3000/webpages/dashboard", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
