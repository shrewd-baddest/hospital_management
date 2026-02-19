import {
  ClipboardDocumentIcon,
  ClockIcon,
  FunnelIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Calendar from "../assets/Calendar/Calendar";
import { useLoaderData } from "react-router-dom";
const Appointments = () => {
  // const role = localStorage.getItem(role);
  const role = "doctor";
  const Schedules = useLoaderData();
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const displayAppointments = () => {
    switch (role) {
      case "admin": {
        return (
          <div className="grid w-screen space-y-6 overflow-hidden p-[5%] ">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-extrabold text-black">
                Appointments
              </h1>
              <button className="flex mr-[20%] py-1 text-white bg-blue-700 rounded-lg shadow-lg min-w-fit h-fit">
                <ClipboardDocumentIcon className="inline w-6 h-6" />
                <h2 className="text-lg font-bold">Create New Appointment</h2>
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
              <h1 className="text-2xl font-extrabold shadow-md">
                Appointments
              </h1>

              <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg w-fit">
                <button onClick={() => changeDate(-1)}>
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <span className="font-medium text-gray-800">
                  {formattedDate}
                </span>

                <button onClick={() => changeDate(1)}>
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <h3>
                <FunnelIcon w-5 h-5 />
                Filters
              </h3>

              <button>+ Add Appointment</button>
            </div>
            <div className="flex flex-wrap flex-row gap-[5%]">
              {Array.isArray(Schedules) &&
                Schedules.map((schedule) => (
                  <div key={schedule.id} className="flex flex-col gap-5">
                    <div className="flex flex-row gap-[3%] p-4 w-[18%]">
                      <section>
                        <h3>{schedule.patients}</h3>
                        <h5>{schedule.range}</h5>
                        <p>
                          {`<ClockIcon w-4 h-4 />${schedule.duration} 
                        <MapPinIcon w-4 h-4 /> ${schedule.department}`}
                        </p>
                      </section>
                      <section>{schedule.status}</section>
                    </div>
                    <div className="flex flex-row gap-[4%]">
                      <button className="px-2 py-1 border-2 border-black shadow-lg">
                        Reschedule
                      </button>
                      <button className="px-2 py-1 border-2 border-black shadow-lg">
                        View Patient
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        );
      }
    }
  };
  return { displayAppointments };
};

export default Appointments;

export const appointments = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/webpages/doctor/appointment",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return await response.json();
  } catch (error) {
    return error.message;
  }
};
