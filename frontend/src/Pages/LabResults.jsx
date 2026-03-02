import { ClipboardDocumentIcon, ClockIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

const LabResults = () => {
  const [labResults, setlabResults] = useState([]);
  const [search, setSearch] = useState(null);
  const role = "doctor";

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
      <section>
        <h1>Lab Results Overview</h1>
        <button>+ Request New Test</button>
      </section>

      <div>
        <section>
          <h3>
            Critical Results <BellAlertIcon className="inline w-5 h-5" />
          </h3>
          <h2>{LabResults.critical}</h2>
          <p>Requires immediate attention</p>
        </section>
        <section>
          <h3>
            Pending Results <ClockIcon className="inline w-5 h-5" />
          </h3>
          <h2>{LabResults.pending}</h2>
          <p>Awaiting pathologist review</p>
        </section>
        <section>
          <h3>
            Reviewed Today <ClipboardDocumentIcon className="inline w-5 h-5" />
          </h3>
          <h2>{LabResults.reviewed}</h2>
          <p>Results with notes or follow-ups</p>
        </section>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search patient or test Name..."
          onChange={(e) => setSearch({ name: e.target.value })}
        />
        <section>
          <button
            onClick={() => {
              setSearch({ status: "all" });
              filteredPatients();
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setSearch({ status: "critical" });
              filteredPatients();
            }}
          >
            Critical
          </button>
          <button
            onClick={() => {
              setSearch({ status: "normal" });
              filteredPatients();
            }}
          >
            Normal
          </button>
          <button>
            onClick=
            {() => {
              setSearch({ status: "pending" });
              filteredPatients();
            }}
            Pending
          </button>
        </section>
        <input type="Date" />
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
