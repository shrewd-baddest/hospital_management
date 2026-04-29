import React, { useEffect } from "react";
import { ActionButton, StatCard } from "./Components";
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
  BellAlertIcon,
  ClipboardDocumentIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useStyles } from "../StylingProvider";
const Doctor = () => {
  const { fetchDashboard, data, loading } = useStyles();
  const role = localStorage.getItem("role") || "doctor";

  useEffect(() => {
    fetchDashboard(role);
  }, [role]);

  if (loading) return <p className="p-5">Loading...</p>;
  if (!data) return <p className="p-5">No dashboard data</p>;

  const {
    fullName = "Doctor",
    appointmentNumber = 0,
    LabResults = 0,
    referrals = 0,
    appointments = [],
    notifications = [],
  } = data;

  return (
    <>
      <p className="text-gray-500">{new Date().toISOString().split("T")[0]}</p>

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
                <td colSpan="4" className="py-3 text-center text-gray-500">
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

        {notifications.map((note, index) => {
          const isToday =
            new Date(note.created_at).toDateString() ===
            new Date().toDateString();
          return (
            <div
              key={index}
              className={`py-3 border-b ${note.is_read ? "bg-gray-50" : "bg-red-50"}`}
            >
              <div className="flex items-center gap-2">
                <ReceiptPercentIcon className="w-4 h-4 text-red-500" />
                <p>{note.message}</p>
              </div>
              {isToday ? (
                <p className="text-sm text-red-500">
                  {new Date(note.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex flex-wrap gap-4 mt-10">
        <ActionButton
          Icon={ClipboardDocumentCheckIcon}
          label="Add Prescription"
        />
        <ActionButton Icon={UserGroupIcon} label="Manage Patients" />
        <ActionButton Icon={MicrophoneIcon} label="View Pending Results" />
        <ActionButton Icon={UserIcon} label="Update Availability" />
      </div>
    </>
  );
};

export default Doctor;
