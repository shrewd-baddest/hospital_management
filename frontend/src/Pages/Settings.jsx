import axios from "axios";
import React, { useEffect } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("hospital-info");
  const [settingsData, setSettingsData] = React.useState(null);
  const [EditMode, setEditMode] = React.useState(false);
  const [notificationDetails, setNotificationDetails] = React.useState(null);
  // const [logoFile, setLogoFile] = React.useState(null);
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
                // if (!logoFile) {
                //   formData.append("logo", settingsData.logo);
                // }

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
                  .then((data) => {
                    alert("Settings updated successfully!");
                    setSettingsData(data);
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
                    setSettingsData({
                      ...settingsData,
                      logo: e.target.files[0],
                    });
                    // setLogoFile(e.target.files[0]);
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
          <div>
            <h1>Notifications Settings</h1>

            <section>
              <ul>
                <li>All</li>
                <li>Unread</li>
                <li>Read</li>
                <li>Critical</li>
                <li>Normal</li>
              </ul>
              <input
                type="text"
                name="🔍 notification-filter"
                id="notification-filter"
              />
            </section>

            <div className="grid grid-cols-[3fr_1fr] gap-[5%] lg:max-w-[90%] mt-5">
              <section>
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
                          className="px-3 py-1 text-sm text-black bg-white rounded cursor-pointer hover:bg-gray-100 max-w-fit"
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
                  <p>No notifications available.</p>
                )}
              </section>
              <section>
                <h2>Notification Details</h2>
                <p>Select a notification to view more details here.</p>
                {notificationDetails &&
                  showDetails(
                    notificationDetails.message,
                    notificationDetails.created_at,
                    notificationDetails.type,
                  )}

                <div>
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
                        if (response.message == "Notification marked as read") {
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
          className="transition duration-100 cursor-pointer hover:underline"
          onClick={() => setActiveTab("hospital-info")}
        >
          Hospital info
        </li>
        <li
          className="transition duration-100 cursor-pointer hover:underline"
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </li>
        <li
          className="transition duration-100 cursor-pointer hover:underline"
          onClick={() => setActiveTab("account")}
        >
          Account
        </li>
        <li
          className="transition duration-100 cursor-pointer hover:underline"
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
