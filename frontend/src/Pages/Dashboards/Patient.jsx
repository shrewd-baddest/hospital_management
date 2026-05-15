import React, { useEffect } from "react";
import { useStyles } from "../StylingProvider";
import { StatCard } from "./Components";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Patient = () => {
  const { fetchDashboard, data, loading } = useStyles();
  const role = localStorage.getItem("role") || "patient";
  const [active, setActive] = useState("appointment");

  useEffect(() => {
    fetchDashboard(role);
  }, [role]);

  if (loading) return <p className="p-5">Loading...</p>;
  if (!data) return <p className="p-5">No dashboard data</p>;

  const {
    fullName = "Doctor",
    LabResults = 0,
    appointments = [],
    notifications = [],
    billing = 0,
  } = data;

  return (
    <div>
      <section>
        <h1 className="mb-4 text-xl font-bold">Welcome Back, {fullName}</h1>
        <p className="mb-2">
          Here's a quick overview of your health status and upcoming activities
        </p>
      </section>
      <section className="flex flex-row gap-[4%] mb-5">
        <button
          className={`flex flex-row gap-3 px-3 py-1 border-2 rounded-md ${active == "appointment" ? "bg-blue-500" : ""}`}
          onClick={() => {
            setActive("appointment");
          }}
        >
          <ClipboardDocumentListIcon className="w-6 h-6" />
          <h4 className="font-semibold ">Book New appointment</h4>
        </button>
        <button
          className={`flex flex-row gap-3 px-3 py-1 border-2 rounded-md ${active == "prescription" ? "bg-blue-500" : ""}`}
          onClick={() => {
            setActive("prescription");
          }}
        >
          <LinkIcon className="w-6 h-7" />
          <h4 className="font-semibold ">Request Prescription Refill</h4>
        </button>
      </section>

      <section className="flex flex-wrap gap-5 ">
        <StatCard
          title="Upcoming Appointments"
          Icon="ClipboardDocumentCheckIcon"
          value={appointments}
          view={{ text: "appointments", path: "dashboard/appointments" }}
        />
        <StatCard
          title="testing results"
          Icon="ClipboardDocumentCheckIcon"
          value={LabResults}
          view={{ text: "Results", path: "dashboard/lab-results" }}
        />
        <StatCard
          title="Medication Reminder"
          Icon="ClipboardDocumentCheckIcon"
          value={notifications}
          view={{ text: "medications", path: "dashboard/medical-records" }}
        />
        <StatCard
          title="Billings"
          Icon="ClipboardDocumentCheckIcon"
          value={billing}
        />
      </section>
    </div>
  );
};

export default Patient;
