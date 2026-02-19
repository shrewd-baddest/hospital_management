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
} from "@heroicons/react/24/outline";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Linegraph from "../assets/Linegraph";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const dashboardData = useLoaderData();
  const doctor = dashboardData;
  // const role = "admin";
  const adminData = dashboardData.overview;
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

      case "doctor": {
        return (
          <div>
            <p>{date.now()}</p>
            <h1>{`Hello ,Dr.${doctor.fullName}`}</h1>

            <div>
              <section>
                <p>
                  Today's appointments <ClipboardDocumentCheckIcon />
                </p>
                <h1>{doctor.appointmentNumber}</h1>
              </section>
              <section>
                <p>
                  Critical Lab Results <FunnelIcon />
                </p>
                <h1>{doctor.LabResults}</h1>
              </section>
              <section>
                <p>pending referrals</p>
                <h1>{doctor.referrals}</h1>
                <p>patients awaiting for review</p>
              </section>
              <section></section>
            </div>
            <div>
              <table className="w-full border-collapse">
                <thead className="rounded-lg">
                  <tr className="rounded-lg bg-gray-50">
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Patient Name</th>
                    <th className="px-4 py-2 text-left">Reason</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(doctor.appointments) &&
                    doctor.appointments.map((invoice) => (
                      <tr
                        key={invoice.invoiceId}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{invoice.time}</td>
                        <td className="px-4 py-2">{invoice.patientName}</td>
                        <td className="px-4 py-2">{invoice.reason}</td>
                        <td className="px-4 py-2">{invoice.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <section>
               <h1> Recent Alerts</h1>
               <p>Important notifications requiring attention</p>
               {
               Array.isArray(doctor.notifications)&&
               doctor.notifications.map((not,index)=>{
                <div key={index}>
<h4><ReceiptPercentIcon /> {not.message}</h4>
<p>{not.time}</p>
                </div>
               }

               )
               }
              </section>
            </div>
            <div>
              <h3>Quick Action</h3>
              <button>
                <ClipboardDocumentCheckIcon />
                Add New Prescription
              </button>
              <button>
                <UserGroupIcon />
                Manage Patient List
              </button>
              <button>
                <MicrophoneIcon />
                View Pending Results
              </button>
              <button>
                <UserIcon />
                Update Availability
              </button>
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
