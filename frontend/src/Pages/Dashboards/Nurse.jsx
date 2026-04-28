import React, { useEffect } from "react";
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
import DoughnutChart from "../../assets/Graphs/DoughnutChart";
const Nurse = () => {
  const { fetchDashboard, data, loading } = useStyles();
  const role = localStorage("role") || "nurse";

  useEffect(() => {
    fetchDashboard(role);
  }, [role]);
  const {
    fullName = "Nurse",
    totalPatients = 0,
    todayPatients = 0,
    dischargedToday = 0,
    criticalPatients = 0,
    appointments = 0,
    alerts = 0,
  } = data;

  if (loading) return <p className="p-5">Loading...</p>;
  if (!data) return <p className="p-5">No dashboard data</p>;
  return (
    <>
      <h1>Hello Nurse {fullName}</h1>
      <p>Here's your overview for today</p>

      <h2>Overview</h2>

      <section className="flex flex-row flex-wrap">
        <StatCard
          title="Total patients"
          value={totalPatients}
          Icon={UserGroupIcon}
        />
        <StatCard
          title="Admitted Today"
          value={todayPatients}
          Icon={UserGroupIcon}
        />
        <StatCard
          title="Discharged Today"
          value={dischargedToday}
          Icon={UserGroupIcon}
        />
        <StatCard
          title="Critical patients"
          value={criticalPatients}
          Icon={UserGroupIcon}
        />
      </section>

      <section className="flex flex-row flex-wrap gap-1 mt-10">
        <StatCard
          title="UpComing Appointments"
          value={appointments}
          Icon={ClipboardIcon}
        />
        <StatCard title="Critical Alerts" value={alerts} Icon={BellAlertIcon} />

        <div>
          <h2>Quick Actions</h2>
          <button>
            <UserPlusIcon />
            <h4>Admin New Patient</h4>
          </button>

          <button>
            <ClipboardDocumentIcon />
            <h4>Schedule Appointments</h4>
          </button>
          <button>
            <BellIcon />
            <h4>View All Alerts</h4>
          </button>
          <button>
            <ClipboardDocumentCheckIcon />
            <h4>Manage Ward Beds</h4>
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2>Patient Status Distribution</h2>
        <div className="max-w-md">
          <p className="text-sm text-gray-500">
            This chart shows the distribution of patients by their current
            status (stable, observation, critical, discharged). It helps you
            quickly identify how many patients are in critical condition and may
            require immediate attention.
          </p>
          <DoughnutChart />
        </div>
      </section>
    </>
  );
};

export default Nurse;
