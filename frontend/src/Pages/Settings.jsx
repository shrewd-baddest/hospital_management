import axios from "axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("hospital-info");
  const [settingsData, setSettingsData] = React.useState(null);
  const [EditMode, setEditMode] = React.useState(false);
  const [notificationDetails, setNotificationDetails] = React.useState(null);
  const [notTab, setNotTab] = useState("all");
  const [logoFile, setLogoFile] = React.useState(null);
  const [searchText, setSearchText] = useState("");
  const urls = {
    "hospital-info": "http://localhost:3000/webpages/hospital-info",
    notifications: "http://localhost:3000/webpages/notifications",
    account: "http://localhost:3000/webpages/account",
    "user-preferences": "http://localhost:3000/webpages/user-preferences",
  };

  useEffect(() => {
    const url = urls[activeTab];
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setSettingsData(response);
        console.log(response);
      });
  }, [activeTab]);

  const showDetails = (notificationmsg, eventTime, source) => {
    return (
      <div>
        <h3>{notificationmsg}</h3>
        <p>Source: {source}</p>
        <p>Received: {new Date(eventTime).toLocaleString()}</p>
      </div>
    );
  };

  const getSpecificNotifications = async (tab, searchText) => {
    try {
      const safeSearch = searchText?.trim() || "";
      const response = await axios.post(
        "http://localhost:3000/webpages/notifications",
        { notTab: tab, searchText: safeSearch },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setSettingsData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const settingsRender = () => {
    switch (activeTab) {
      case "hospital-info":
        return (
          <div>
            <h4 className="text-2xl font-semibold">General Information</h4>
            <p>Manage your hospital system configurations and settings here.</p>
            <form
              className="grid grid-cols-1 mt-5 gap-[5%] lg:max-w-[70%] mb-9"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                if (logoFile) {
                  alert("Uploading new logo...");
                }

                axios
                  .post(
                    "http://localhost:3000/webpages/hospital-info",
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    },
                  )
                  .then((res) => {
                    alert("Settings updated successfully!");
                    setSettingsData(res.data);
                    setEditMode(false);
                  });
              }}
            >
              <section className="grid grid-cols-1">
                <label
                  htmlFor="Hospital Name"
                  className="text-lg font-semibold"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="Hospital Name"
                  value={settingsData?.name || ""}
                  onChange={(e) => {
                    setSettingsData({
                      ...settingsData,
                      name: e.target.value,
                    });
                  }}
                  name="Name"
                  className="lg:max-w-[60%] text-black font-semibold"
                  readOnly={!EditMode}
                />
              </section>
              <section className="grid grid-cols-1">
                <label htmlFor="Address" className="text-lg font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  value={settingsData?.address || ""}
                  name="Address"
                  onChange={(e) => {
                    setSettingsData({
                      ...settingsData,
                      address: e.target.value,
                    });
                  }}
                  className="lg:max-w-[60%] text-black font-semibold"
                  readOnly={!EditMode}
                />
              </section>
              e
              <section className="grid grid-cols-1">
                <label
                  htmlFor="Contact Number"
                  className="text-lg font-semibold "
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="Contact Number"
                  value={settingsData?.phone_number || ""}
                  name="phone_number"
                  onChange={(e) => {
                    setSettingsData({
                      ...settingsData,
                      phone_number: e.target.value,
                    });
                  }}
                  className="lg:max-w-[60%] text-black font-semibold"
                  readOnly={!EditMode}
                />
              </section>
              <section className="grid grid-cols-1">
                <label htmlFor="Email" className="text-lg font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={settingsData?.email || ""}
                  onChange={(e) => {
                    setSettingsData({
                      ...settingsData,
                      email: e.target.value,
                    });
                  }}
                  className="lg:max-w-[60%] text-black font-semibold"
                  readOnly={!EditMode}
                />
              </section>
              <section className="grid grid-cols-1">
                <label
                  htmlFor="Hospital logo"
                  className="text-lg font-semibold"
                >
                  Hospital logo
                </label>
                <img
                  src={settingsData?.logo}
                  alt="Hospital Logo"
                  className="w-[20%] h-[60%] rounded-full"
                />
                <input
                  type="file"
                  id="Hospital logo"
                  // value="New Logo"
                  name="logo"
                  onChange={(e) => {
                    setLogoFile(e.target.files[0]);
                  }}
                  className="lg:max-w-[60%]"
                  disabled={!EditMode}
                />
              </section>
              <section className="flex flex-row gap-[6%] mt-5 pb-9">
                <button
                  onClick={() => setEditMode(!EditMode)}
                  className="px-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                  type="button"
                >
                  Edit Information
                </button>
                <button
                  type="submit"
                  className="px-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </section>
            </form>
          </div>
        );
      case "notifications":
        return (
          <div className="h-[70vh] p-4">
            <h1 className="mb-4 text-2xl font-bold">Notifications Settings</h1>

            <section className="flex flex-row justify-between ">
              <ul className="flex flex-row gap-4">
                <li
                  onClick={() => setNotTab("all")}
                  className={`hover:cursor-pointer   ${notTab === "all" ? "text-blue-500 font-semibold" : ""}`}
                >
                  All
                </li>
                <li
                  onClick={() => {
                    setNotTab("unread");
                    getSpecificNotifications("unread", searchText);
                  }}
                  className={`hover:cursor-pointer   ${notTab === "unread" ? "text-blue-500 font-semibold" : ""}`}
                >
                  Unread
                </li>
                <li
                  onClick={() => {
                    setNotTab("read");
                    getSpecificNotifications("read", searchText);
                  }}
                  className={`hover:cursor-pointer   ${notTab === "read" ? "text-blue-500 font-semibold" : ""}`}
                >
                  Read
                </li>
                <li
                  onClick={() => {
                    setNotTab("critical");
                    getSpecificNotifications("critical", searchText);
                  }}
                  className={`hover:cursor-pointer   ${notTab === "critical" ? "text-blue-500 font-semibold" : ""}`}
                >
                  Critical
                </li>
                <li
                  onClick={() => {
                    setNotTab("normal");
                    getSpecificNotifications("normal", searchText);
                  }}
                  className={`hover:cursor-pointer   ${notTab === "normal" ? "text-blue-500 font-semibold" : ""}`}
                >
                  Normal
                </li>
              </ul>
              <input
                type="text"
                name="notification-filter"
                id="notification-filter"
                placeholder="🔍 Search notifications..."
                className="px-2 py-1 border border-gray-300 rounded-lg min-w-[40%] lg:max-w-[30%]"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </section>

            <div className="grid grid-cols-[3fr_1fr] gap-[5%] lg:max-w-[90%] mt-5 h-[80%]">
              <section className="border-solid rounded-lg shadow-md p-[4%] min-h-2/5 overflow-y-auto max-h-[]">
                {settingsData && settingsData.length > 0 ? (
                  <ul>
                    {settingsData.map((notification) => (
                      <li
                        key={notification.id}
                        className="p-4 border-b visited:bg-slate-50 bg-slate-200 max-w-70% rounded-lg mb-3"
                      >
                        <p
                          className={
                            notification.status === "critical"
                              ? "text-red-600 font-bold"
                              : "text-green-600 font-bold"
                          }
                        >
                          Status: {notification.status}
                        </p>
                        <h3 className="font-semibold">{notification.type}:</h3>
                        <p>{notification.message}</p>
                        <p>
                          Received:{" "}
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                        <button
                          className="h-full px-3 py-1 text-sm text-black bg-white rounded cursor-pointer hover:bg-gray-100 max-w-fit"
                          onClick={() => {
                            setNotificationDetails(notification);
                          }}
                        >
                          View Details
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg font-medium text-center text-slate-500">
                    No notifications available.
                  </p>
                )}
              </section>
              <section className="border-solid rounded-lg shadow-md p-[8%]  flex flex-col justify-between min-w-fit min-h-2/5">
                <div>
                  <h2 className="font-semibold ">Notification Details</h2>
                  <p>Select a notification to view more details here.</p>
                  {notificationDetails &&
                    showDetails(
                      notificationDetails.message,
                      notificationDetails.created_at,
                      notificationDetails.type,
                    )}
                </div>

                <div className="flex flex-col justify-center items-center gap-[4%]">
                  <button
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700 max-w-fit"
                    onClick={async () => {
                      if (!notificationDetails) {
                        alert("No notification selected.");
                        return;
                      }

                      try {
                        var response = await axios.put(
                          `http://localhost:3000/webpages/notificationsRead/${notificationDetails.id}`,
                          { is_read: true },
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                          },
                        );
                        if (
                          response.data.message == "Notification marked as read"
                        ) {
                          alert("Notification acknowledged.");
                          setNotificationDetails(null);
                        }
                      } catch (error) {
                        console.error(error);
                        alert("Failed to acknowledge notification.");
                      }
                    }}
                  >
                    Acknowledge
                  </button>

                  <button
                    className="px-7 py-1 ml-2 mt-3 text-sm font-semibold text-white bg-red-500 rounded cursor-pointer hover:bg-red-700  max-w-[100%]"
                    onClick={() => {
                      setNotificationDetails(null);
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </section>
            </div>
          </div>
        );
      case "account":
        return <div>Account Settings</div>;
      case "user-preferences":
        return <div>User Preferences Settings</div>;
      default:
        return <div>Hospital Info Settings</div>;
    }
  };
  return (
    <div>
      <h1 className="py-5 text-2xl font-bold">Settings</h1>
      <h5 className="mt-2 text-lg font-semibold text-slate-800">
        Manage your hospital system configurations
      </h5>
      <ul className="flex flex-row min-w-fit gap-[5%] mt-5 font-medium list-inside text-slate-700 bg-slate-200 px-[6%] lg:max-w-[80%] rounded-lg py-2">
        <li
          className={`${activeTab == "hospital-info" ? "underline font-bold text-slate-950" : ""} transition duration-100 cursor-pointer`}
          onClick={() => setActiveTab("hospital-info")}
        >
          Hospital info
        </li>
        <li
          className={`${activeTab == "notifications" ? "underline font-bold text-slate-950" : ""} transition duration-100 cursor-pointer`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </li>
        <li
          className={`${activeTab == "account" ? "underline font-bold text-slate-950" : ""} transition duration-100 cursor-pointer`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </li>
        <li
          className={`${activeTab == "user-preferences" ? "underline font-bold text-slate-950" : ""} transition duration-100 cursor-pointer`}
          onClick={() => setActiveTab("user-preferences")}
        >
          User Preferences
        </li>
      </ul>
      <div className="mt-10">{settingsRender()}</div>
    </div>
  );
};

export default Settings;
