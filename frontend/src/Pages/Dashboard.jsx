import React, { useEffect, useState } from "react";
import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  FunnelIcon,
  MicrophoneIcon,
  ReceiptPercentIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
  CalendarDateRangeIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

import Linegraph from "../assets/Linegraph";

const Dashboard = () => {
  const role = "doctor";
  // const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const urls = {
    admin: "http://localhost:3000/webpages/dashboard",
    doctor: "http://localhost:3000/webpages/doctor/dashboard",
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(urls[role], {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (role && urls[role]) {
      fetchDashboard();
    }
  }, [role, token]);

  if (loading) return <p className="p-5">Loading...</p>;
  if (!data) return <p className="p-5">No dashboard data</p>;

  /* ================= SWITCH RENDER ================= */
  const renderDashboard = () => {
    switch (role) {
      case "admin": {
        const overview = data?.overview || {};
        const {
          totalPatients = 0,
          admissions = 0,
          totalEmptyBeds = 0,
          totalOccupiedBeds = 0,
          recentActivities = [],
        } = overview;

        return (
          <>
            {/* STATS */}
            <div className="flex flex-wrap gap-5">
              <StatCard
                title="Total Patients"
                value={totalPatients}
                Icon={UserGroupIcon}
              />
              <StatCard
                title="Today's Admissions"
                value={admissions}
                Icon={FunnelIcon}
              />
              <StatCard
                title="Available Beds"
                value={totalEmptyBeds}
                Icon={BuildingStorefrontIcon}
              />
              <StatCard
                title="Occupied Beds"
                value={totalOccupiedBeds}
                Icon={ClipboardDocumentCheckIcon}
              />
            </div>

            {/* GRAPH */}
            <div className="mt-10">
              <h2 className="text-xl font-bold">Admissions Trend</h2>
              <Linegraph />
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <ActionButton Icon={UserPlusIcon} label="Add Patient" />
              <ActionButton Icon={ClipboardIcon} label="Schedule Appointment" />
              <ActionButton Icon={ChartBarIcon} label="View Reports" />
            </div>

            {/* RECENT ACTIVITIES */}
            <div className="mt-10">
              <h3 className="mb-3 font-semibold">Recent Activities</h3>
              {recentActivities.length === 0 && (
                <p className="text-gray-500">No recent activities</p>
              )}
              {recentActivities.map((item, index) => (
                <div key={index} className="flex gap-3 py-2 border-b">
                  <p className="text-sm text-gray-500">{item.time}</p>
                  <p>{item.activity}</p>
                </div>
              ))}
            </div>
          </>
        );
      }

      case "doctor": {
        const {
          fullName = "",
          appointmentNumber = 0,
          LabResults = 0,
          referrals = 0,
          appointments = [],
          notifications = [],
        } = data;

        return (
          <>
            <p className="text-gray-500">
              {new Date().toISOString().split("T")[0]}
            </p>

            <h1 className="mb-6 text-2xl font-bold">Hello, Dr. {fullName}</h1>

            {/* SUMMARY CARDS */}
            <div className="flex flex-wrap gap-5">
              <StatCard
                title="Today's Appointments"
                value={appointmentNumber}
                Icon={CalendarDateRangeIcon}
              />
              <StatCard
                title="Critical Lab Results"
                value={LabResults}
                Icon={BeakerIcon}
              />
              <StatCard
                title="Pending Referrals"
                value={referrals}
                Icon={ReceiptPercentIcon}
              />
            </div>

            {/* TABLE */}
            <div className="mt-10">
              <h3 className="mb-3 font-semibold">Today's Schedule</h3>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Patient</th>
                    <th className="px-4 py-2 text-left">Reason</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-3 text-center text-gray-500"
                      >
                        No appointments today
                      </td>
                    </tr>
                  )}

                  {appointments.map((appt, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{appt.start_time}</td>
                      <td className="px-4 py-2">{appt.patient_name}</td>
                      <td className="px-4 py-2">{appt.reason}</td>
                      <td className="px-4 py-2">{appt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ALERTS */}
            <div className="mt-10">
              <h3 className="mb-3 font-semibold">Recent Alerts</h3>

              {notifications.length === 0 && (
                <p className="text-gray-500">No alerts</p>
              )}

              {notifications.map((note, index) => (
                <div key={index} className="py-3 border-b">
                  <div className="flex items-center gap-2">
                    <ReceiptPercentIcon className="w-4 h-4 text-red-500" />
                    <p>{note.message}</p>
                  </div>
                  <p className="text-sm text-gray-500">{note.time}</p>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <ActionButton
                Icon={ClipboardDocumentCheckIcon}
                label="Add Prescription"
              />
              <ActionButton Icon={UserGroupIcon} label="Manage Patients" />
              <ActionButton
                Icon={MicrophoneIcon}
                label="View Pending Results"
              />
              <ActionButton Icon={UserIcon} label="Update Availability" />
            </div>
          </>
        );
      }

      default:
        return <p>Invalid role</p>;
    }
  };

  return <div className="p-5">{renderDashboard()}</div>;
};

export default Dashboard;

// REUSABLE COMPONENTS

const StatCard = ({ title, value, Icon }) => (
  <div className="p-5 shadow-md rounded-lg min-w-[200px]">
    <div className="flex items-center justify-between">
      <p className="font-semibold">{title}</p>
      {Icon && <Icon className="w-6 h-6 text-blue-600" />}
    </div>
    <h2 className="mt-3 text-2xl font-bold">{value}</h2>
  </div>
);

const ActionButton = ({ Icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
    {Icon && <Icon className="w-5 h-5" />}
    {label}
  </button>
);
