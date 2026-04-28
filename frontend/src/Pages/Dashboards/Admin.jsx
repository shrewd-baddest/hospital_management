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
import Linegraph from "../../assets/Linegraph";
const Admin = () => {
  const { fetchDashboard, data, loading } = useStyles();
  const overview = data?.overview || {};
  const {
    totalPatients = 0,
    admissions = 0,
    totalEmptyBeds = 0,
    totalOccupiedBeds = 0,
    recentActivities = [],
  } = overview;

  const role = "admin";

  useEffect(() => {
    fetchDashboard(role);
  }, [role]);

  if (loading) return <p className="p-5">Loading...</p>;
  if (!data) return <p className="p-5">No dashboard data</p>;

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
};

export default Admin;
