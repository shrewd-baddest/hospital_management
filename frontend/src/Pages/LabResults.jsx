import {
  BellAlertIcon,
  ClipboardDocumentIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const LabResults = () => {
  const [labResults, setlabResults] = useState([]);
  const [search, setSearch] = useState(null);
  const role = "doctor";
  const [activeTab, setActiveTab] = useState("all");

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
      setlabResults(data.details || []);
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
    if (search.status == undefined && search.name !== undefined) {
      fetchPatients("GET", `${urls.doctor}/search?name=${search.name}`);
    } else if (search.status !== undefined && search.name == undefined) {
      fetchPatients("GET", `${urls.doctor}/search?status=${search.status}`);
    } else if (search.status !== undefined && search.name !== undefined) {
      fetchPatients(
        "GET",
        `${urls.doctor}/search?status=${search.status}&name=${search.name} `,
      );
    }
  };

  return (
    <div>
      <section className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold ">Lab Results Overview</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600">
          + Request New Test
        </button>
      </section>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <section>
          <h3 className="flex items-center gap-1">
            Critical Results
            <BellAlertIcon className="inline w-5 h-5" />
          </h3>
          <h2 className="text-2xl font-bold">{LabResults.critical}</h2>
          <p className="text-gray-600">Requires immediate attention</p>
        </section>
        <section>
          <h3 className="flex items-center gap-1">
            Pending Results <ClockIcon className="inline w-5 h-5" />
          </h3>
          <h2 className="text-2xl font-bold">{LabResults.pending}</h2>
          <p className="text-gray-600">Awaiting pathologist review</p>
        </section>
        <section>
          <h3 className="flex items-center gap-1">
            Reviewed Today <ClipboardDocumentIcon className="inline w-5 h-5" />
          </h3>
          <h2 className="text-2xl font-bold">{LabResults.reviewed}</h2>
          <p className="text-gray-600">Results with notes or follow-ups</p>
        </section>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mt-6 lg:flex-row">
        {/* <section className="w-full lg:w-auto"> */}
        <input
          type="text"
          placeholder="Search patient or test Name..."
          onChange={(e) => setSearch({ name: e.target.value })}
          className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-lg"
        />
        {/* </section> */}
        <section className="grid grid-cols-4 gap-2">
          <button
            onClick={() => {
              setSearch({ status: "all" });
              setActiveTab("all");
              filteredPatients();
            }}
            className={`${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer px-4 py-2 rounded-lg mr-2`}
          >
            All
          </button>
          <button
            onClick={() => {
              setSearch({ status: "critical" });
              setActiveTab("critical");
              filteredPatients();
            }}
            className={`${activeTab === "critical" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer px-4 py-2 rounded-lg mr-2`}
          >
            Critical
          </button>
          <button
            onClick={() => {
              setSearch({ status: "normal" });
              filteredPatients();
              setActiveTab("normal");
            }}
            className={`${activeTab === "normal" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer px-4 py-2 rounded-lg mr-2`}
          >
            Normal
          </button>
          <button
            onClick={() => {
              setSearch({ status: "pending" });
              setActiveTab("pending");
              filteredPatients();
            }}
            className={`${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} cursor-pointer px-4 py-2 rounded-lg mr-2`}
          >
            Pending
          </button>
        </section>

        {/* <section> */}
        <input
          type="Date"
          onChange={(e) => {
            setSearch({ date: e.target.value });
            filteredPatients();
          }}
          className="w-full max-w-md p-2 mt-3 border border-gray-300 rounded-lg "
        />
        {/* </section> */}
      </div>

      <div>
        <h1>Recent Lab Results</h1>
        <p>Detailed list of all lab tests for your patients</p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Test Name</th>
              <th className="px-4 py-2 text-left">Result</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {labResults.length === 0 && (
              <tr>
                <td colSpan="4" className="py-3 text-center text-gray-500">
                  No labResults today
                </td>
              </tr>
            )}

            {labResults.map((lab, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{lab.patient_name}</td>
                <td className="px-4 py-2">{lab.test_name}</td>
                <td className="px-4 py-2">{lab.results}</td>
                <td className="px-4 py-2">{lab.status}</td>
                <td className="px-4 py-2">{lab.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabResults;
