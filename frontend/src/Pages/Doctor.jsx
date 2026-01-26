import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Doctor = () => {
  const doctors = useLoaderData();
  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [schedule, setSchedule] = useState(null);
  const [shiftDoctorId, setShiftDoctorId] = useState(null);
  const getSchedule = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/webpages/doctor/schedule/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      const data = await res.json();
      setSchedule(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${activeDoctorId || shiftDoctorId ? "relative blur-lg" : "static"} w-full`}
    >
      <h1 className="mb-3 text-2xl font-bold">Doctors Directory</h1>
      <p>
        Manage and view all medical practitioners within admin.Filter by
        speciality and availability to find the right doctor quickly
      </p>
      <div className="flex flex-row justify-between w-full gap-4 mt-4">
        <input
          type="text"
          placeholder="🔍 Search doctors by name or ID"
          className="w-2/3 px-3 py-2 font-semibold bg-transparent rounded-lg outline-emerald-950 "
        />
        {/* </div> */}
        <select className="px-3 py-2 mr-10 font-semibold rounded-lg outline-none h-fit">
          <option value="" selected>
            Filter by Availability
          </option>
          <option value="away">Away</option>
          <option value="online">Online</option>
          <option value="offline">offline</option>
        </select>
      </div>
      <div>
        {doctors &&
          doctors.map((item) => (
            <div key={item.id} className="grid grid-cols-1">
              <img src={item.image} alt="" />
              <h2 className="text-lg font-bold">{item.name}</h2>
              <h4>{item.department_name}</h4>
              <button
                onClick={() => {
                  setActiveDoctorId(item.id);
                  getSchedule(item.id);
                }}
                className="text-blue-500"
              >
                View Schedule
              </button>
              <div
                className={`${activeDoctorId === item.id ? "grid fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 z-50 shadow-lg" : "hidden"}`}
              >
                <button onClick={() => setActiveDoctorId(null)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule &&
                      schedule.map((sch, idx) => (
                        <tr key={idx}>
                          <td>
                            {new Date(sch.schedule_date).toLocaleDateString()}
                          </td>
                          <td>{sch.start_time}</td>
                          <td>{sch.end_time}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() =>
                  navigate(`/dashboard/${item.id}`, { state: "profile" })
                }
                className="px-6 font-semibold text-black bg-slate-500 outline-0"
              >
                view profile
              </button>
              <button
                onClick={() => {
                  setShiftDoctorId(item.id);
                }}
                disabled={role !== "admin"}
                className={`px-4 py-2 ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              >
                Assign Shifts
              </button>
            </div>
          ))}
      </div>
      <div
        className={`${shiftDoctorId ? "grid" : "hidden"} absolute  w-full h-full bg-gray-800 bg-opacity-50 top-4 right-4`}
      >
        <div>
          <XMarkIcon
            className="w-6 h-6 mt-2 mr-2"
            onClick={() => setShiftDoctorId(null)}
          />
          <h1>Assign Shifts Page - ID: {shiftDoctorId}</h1>
          <p>Assign shifts to the doctor here.</p>
          <div>
            {/* Form or interface for assigning shifts */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const payload = {
                  ...Object.fromEntries(formData.entries()),
                };
                axios
                  .post(
                    `http://localhost:3000/webpages/doctor/shifts/${shiftDoctorId}`,
                    payload,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    },
                  )
                  .then((response) => {
                    console.log("Shifts assigned successfully:", response.data);
                  })
                  .catch((error) => {
                    console.error("Error assigning shifts:", error);
                  });
              }}
            >
              <label>
                Department Name:
                <input type="text" name="department_name" required />
              </label>

              <label>
                Schedule Date:
                <input type="date" name="date" required />
              </label>
              <label>
                Start Time:
                <input type="time" name="start_time" required />
              </label>
              <label>
                End Time:
                <input type="time" name="end_time" required />
              </label>
              <button type="submit">Assign Shift</button>
            </form>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;

export const doctorData = async () => {
  try {
    const response = await fetch("http://localhost:3000/webpages/doctors", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const res = await response.json();
    return res.data;
  } catch (error) {
    return console.error(error.message);
  }
};
