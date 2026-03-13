import {
  BuildingStorefrontIcon,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FunnelIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const Patients = () => {
  const role = "doctor";
  // const role = localStorage.getItem("role");

  const [patients, setPatients] = React.useState([]);
  // const [search, setSearchTerm] = React.useState({});
  // const [medicals, setmedicals] = React.useState([]);
  const [displayMedicalRecords, setDisplayMedicalRecords] =
    React.useState(false);

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
          <PatientsComponent
            displayMedicalRecords={displayMedicalRecords}
            setDisplayMedicalRecords={setDisplayMedicalRecords}
            patients={patients}
            fetchPatients={fetchPatients}
            urls={urls}
          />
        );
      }
      case "nurse": {
        return (
          <div className="grid w-screen space-y-6 overflow-hidden p-[5%] ">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-extrabold text-black">Patients</h1>
            </div>
            <div>
              <PatientsComponent
                displayMedicalRecords={displayMedicalRecords}
                setDisplayMedicalRecords={setDisplayMedicalRecords}
                patients={patients}
                fetchPatients={fetchPatients}
                urls={urls}
              />
            </div>
          </div>
        );
      }
    }
  };

  return <div>{roleBasedRender()}</div>;
};

export default Patients;

const PatientsComponent = ({
  displayMedicalRecords,
  setDisplayMedicalRecords,
  patients,
  fetchPatients,
  urls,
}) => {
  const [search, setSearchTerm] = React.useState({});
  const [medicals, setmedicals] = React.useState([]);

  const filteredPatients = (value, type) => {
    if (type === "name") {
      fetchPatients("GET", `${urls.doctor}/search?name=${value}`);
    } else if (type === "status") {
      fetchPatients("GET", `${urls.doctor}/search?status=${value}`);
    } else {
      fetchPatients("GET", urls.doctor);
    }
  };

  const getMedicalRecords = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/webpages/doctor/patient/${patientId}/medical-records`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      const data = await response.json();
      console.log("Medical records data:", data);

      setmedicals(data.records || []);
      setDisplayMedicalRecords(true);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  return (
    <div className="w-full space-y-6 ">
      <div
        className={`flex flex-row items-center justify-between ${
          displayMedicalRecords
            ? "blur-sm overflow-hidden pointer-events-none "
            : ""
        }`}
      >
        <h1 className="text-xl font-bold">Patients</h1>

        <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg w-fit">
          <button className="flex items-center gap-2 px-2 py-1 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-medium text-gray-800">
            {new Date().toISOString().split("T")[0]}
          </span>
          <button className="flex items-center gap-2 px-2 py-1 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-row items-center gap-[3%]">
          <select
            name="status"
            id="status-filter"
            className="p-2 border border-gray-300 rounded-lg"
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm({ status: value });
              filteredPatients(value, "status");
            }}
          >
            <option value="all">
              <h3>Filters By Status</h3>
            </option>
            <option value="active">Active</option>
            <option value="discharged">Discharged</option>
            <option value="critical">Critical</option>
          </select>
          <button className="flex mr-[20%] py-1 text-white px-2 bg-blue-700 rounded-lg shadow-lg min-w-fit hover:bg-blue-800 font-semibold">
            + Add Patient
          </button>
        </div>
      </div>

      <input
        type="search"
        name="search"
        id="search-input"
        placeholder="Search patients by name..."
        className="min-w-[80%]  p-2 border border-gray-300 rounded-lg mt-3"
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm({ name: value });
          filteredPatients(value, "name");
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
              <h2 className="text-lg font-semibold">{patient.patient_name}</h2>
              <p className="text-sm text-gray-600">{patient.id}</p>

              <p className="text-lg text-black">
                <BuildingStorefrontIcon className="inline w-5 h-5 mr-2" />
                Room/Ward: {patient.ward_name}
              </p>

              <p className="text-lg text-black">
                <ClockIcon className="inline w-5 h-5 mr-2" />
                Appointment Time:{" "}
                {new Date(patient.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="flex flex-row gap-2 mt-3">
                <button
                  onClick={() => getMedicalRecords(patient.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Medical Records
                </button>

                <button className="flex items-center gap-2 px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  Messages
                </button>
              </div>

              {medicals.length > 0 && (
                <div
                  className={`p-4 text-gray-800 rounded-lg fixed
                  ${
                    displayMedicalRecords ? "block" : "hidden"
                  } inset-0 bg-gray-50/50 z-50 flex items-center justify-center`}
                >
                  <button>
                    <XMarkIcon
                      className="absolute w-5 h-5 text-gray-600 cursor-pointer top-2 right-2"
                      onClick={() => setDisplayMedicalRecords(false)}
                    />
                  </button>

                  <h3 className="mb-2 font-semibold text-md">
                    Medical Records
                  </h3>

                  <h4>
                    Patient_id: {patient.id} - {patient.patient_name}
                  </h4>

                  <ul className="list-disc list-inside">
                    {medicals.map((record, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {record.diagnosis} -{" "}
                        {new Date(record.created_at).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
