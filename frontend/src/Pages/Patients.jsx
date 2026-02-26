import {
  BuildingStorefrontIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const Patients = () => {
  const role = "doctor";
  // const role = localStorage.getItem("role");
  const [patients, setPatients] = React.useState([]);
  const [search, setSearchTerm] = React.useState(null);
  const urls = {
    doctor: "http://localhost:3000/webpages/doctor/patients",
    admin: "/admin/dashboard",
  };

  const fetchPatients = async (method, url) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      setPatients(data.details || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (role === "doctor") {
      fetchPatients("GET", urls.doctor);
    } else if (role === "admin") {
      fetchPatients("GET", urls.admin);
    }
  }, [role]);

  const filteredPatients = () => {
    search.name !== undefined
      ? fetchPatients("GET", `${urls.doctor}/search?name=${search.name}`)
      : search.status !== undefined
        ? fetchPatients("GET", `${urls.doctor}/search?status=${search.status}`)
        : fetchPatients("GET", urls.doctor);
  };

  const roleBasedRender = () => {
    switch (role) {
      case "admin": {
        return (
          <div className="grid w-screen space-y-6 overflow-hidden p-[5%] ">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-extrabold text-black">Patients</h1>
              <button className="flex mr-[20%] py-1 text-white bg-blue-700 rounded-lg shadow-lg min-w-fit h-fit">
                <ClipboardDocumentIcon className="inline w-6 h-6" />
                <h2 className="text-lg font-bold">Add New Patient</h2>
              </button>
            </div>

            <div>
              <Calendar />
            </div>
          </div>
        );
      }
      case "doctor": {
        return (
          <>
            <div className="flex flex-row gap-[10%]">
              <h1 className="text-2xl font-extrabold shadow-md">Patients</h1>
              <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg w-fit">
                <button>
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>
                <span className="font-medium text-gray-800">
                  {new Date().toISOString().split("T")[0]}
                </span>
                <button>
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div>
                <h3>
                  <FunnelIcon className="w-5 h-5" />
                  Filters By Status
                </h3>
                <select
                  name="status"
                  id="status-filter"
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    setSearchTerm({ status: e.target.value });
                    filteredPatients();
                  }}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="discharged">Discharged</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <button>+ Add Patient</button>
            </div>
            <input
              type="search"
              name="search"
              id="search-input"
              placeholder="Search patients..."
              className="w-full max-w-md p-2 border border-gray-300 rounded-lg"
              onChange={(e) => {
                setSearchTerm({ name: e.target.value });
                filteredPatients();
              }}
            />

            <div className="flex flex-wrap flex-row gap-[5%]">
              {patients.map((patient, index) => {
                const isToday =
                  new Date(patient.start_time).toDateString() ===
                  new Date().toDateString();
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg shadow-md w-[30%] ${
                      isToday ? "bg-red-50" : "bg-white"
                    }`}
                  >
                    <h2 className="text-lg font-semibold">
                      {patient.patient_name}
                    </h2>
                    <p className="text-sm text-gray-600">{patient.id}</p>
                    <p className="text-lg text-black">
                      <BuildingStorefrontIcon className="inline w-5 h-5 mr-2" />{" "}
                      Room/Ward: {patient.ward_name}
                    </p>
                    <p className="text-lg text-black">
                      <ClockIcon className="inline w-5 h-5 mr-2" /> Appointment
                      Time:{" "}
                      {new Date(patient.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="flex flex-row gap-2 mt-3">
                      <button>Medical Records</button>
                      <button className="flex items-center gap-2">
                        <ChatBubbleLeftIcon className="w-5 h-5" /> Messages
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
    }
  };
  return <div>{roleBasedRender()}</div>;
};

export default Patients;
