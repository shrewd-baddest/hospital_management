import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStyles } from "./StylingProvider";
import Switch from "../assets/Switch";
import {
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassMinusIcon,
  RocketLaunchIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MagnifyingGlassPlusIcon,
  ClockIcon,
  UsersIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ClipboardDocumentIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("hospital-info");
  const [settingsData, setSettingsData] = React.useState(null);
  const [EditMode, setEditMode] = React.useState(false);
  const [notificationDetails, setNotificationDetails] = React.useState(null);
  const [notTab, setNotTab] = useState("all");
  const [logoFile, setLogoFile] = React.useState(null);
  const [searchText, setSearchText] = useState("");
  const { themeSetter, fontSetter } = useStyles();
  const [theme, setTheme] = useState("light");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [fontSize, setFontSize] = useState("full");
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isAutoUpdateOn, setIsAutoUpdateOn] = useState(true);
  const options = ["Light", "Dark", "System"];
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

  const userPreference = {
    volume,
    isAutoUpdateOn,
    isSoundOn,
    fontSize,
    isSwitchOn,
    theme,
  };

  const saveChanges = async () => {
    const response = await axios.post(
      "http://localhost:3000/webpages/user-preferences",
      userPreference,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    var res = response.data;
    setSettingsData(res);
  };

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
        return (
          <div>
            <h1 className="mb-3 text-2xl font-bold">Profile Settings</h1>
            <p>
              Manage your personal information,contact details,and preferences
            </p>
            <hr />

            <section>
              <div className="flex gap-2 mt-5">
                <UsersIcon className="inline w-5 h-5 font-bold" />
                <h1 className="text-xl font-semibold"> Personal Information</h1>
              </div>

              <div className="flex flex-row mt-5 gap-[5%]">
                <img src={settingsData.image} alt="profile picture" />
                <button className="px-4 py-1 transition border border-gray-200 rounded-lg shadow-sm hover:border-blue-500">
                  <input type="file" name="" id="" className="hidden" />
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <section className="grid grid-cols-1">
                  <label htmlFor="name" className="text-lg font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={settingsData?.fullName}
                    className="lg:max-w-[60%] text-black font-semibold"
                  />
                </section>

                <section className="grid grid-cols-1">
                  <label htmlFor="hospital" className="text-lg font-semibold">
                    Hospital/Clinic
                  </label>
                  <p>The institution you are affiliated with</p>
                  <input
                    type="text"
                    name="hospital"
                    value={settingsData?.hospital}
                    className="lg:max-w-[60%] text-black font-semibold"
                  />
                </section>

                <section>
                  <label htmlFor="role" className="text-lg font-semibold">
                    Role
                  </label>
                  <p>Your primary professional role</p>
                  <input
                    type="text"
                    name="role"
                    value={settingsData?.role}
                    className="lg:max-w-[60%] text-black font-semibold w-full"
                  />
                </section>

                <section className="grid grid-cols-1">
                  <label htmlFor="department" className="text-lg font-semibold">
                    Department
                  </label>
                  <p>Your specific department or unit</p>
                  <input
                    type="text"
                    name="role"
                    value={settingsData?.department}
                    className="lg:max-w-[60%] text-black font-semibold"
                  />
                </section>
              </div>
            </section>

            <section>
              <div className="flex gap-2 my-5">
                <EnvelopeIcon className="inline-flex w-6 h-6" />
                <h1 className="text-xl font-semibold">Contact Information</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="grid grid-cols-1">
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email Address
                  </label>
                  <p>Used for account login and primary communication.</p>
                  <input
                    type="email"
                    name="email"
                    value={settingsData.email}
                    className="lg:max-w-[60%] text-black font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label
                    htmlFor="Phone_Number"
                    className="text-lg font-semibold"
                  >
                    Phone Number
                  </label>
                  <p>For critical alerts and two-factor authentication</p>
                  <input
                    type="tel"
                    name="telephone"
                    value={settingsData?.telephone}
                    className="lg:max-w-[60%] text-black font-semibold"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="flex gap-2 mt-5">
                <LockClosedIcon className="inline-flex w-6 h-6" />
                <h1 className="text-xl font-semibold">
                  Update your password and manage security settings.
                </h1>
              </div>

              <p>Minimum 8 characters,including a number and a symbol.</p>
              <div className="flex lg:flex-row gap-[5%] my-5 flex-col">
                <input
                  type="password"
                  name="password"
                  value={settingsData?.password}
                  className="lg:min-w-[50%] text-black font-semibold py-1"
                />
                <button className="px-4 py-1 transition border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 w-fit">
                  Change Password
                </button>
              </div>
              <h2>Two-Factor Authentication (2FA)</h2>
              {/* <P>Add an extra layer of security to your account</P> */}
              <hr />
              <h2 className="text-xl font-semibold">
                Recent Security Activity
              </h2>
              <p>keep track of important account events</p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 text-left">Date</td>
                    <td className="px-4 py-2 text-left">Action</td>
                  </tr>
                </thead>
                {settingsData.securityActivity &&
                  settingsData.securityActivity.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{activity.date}</td>
                      <td className="px-4 py-2">{activity.action}</td>
                    </tr>
                  ))}
              </table>
            </section>
            <section>
              <div className="flex gap-2 my-3">
                <ClipboardDocumentIcon className="inline-flex w-6 h-6" />
                <h1 className="text-xl font-semibold">
                  Billing & Subscription
                </h1>
              </div>
              <p>View your current plan and manage payment methods</p>
              <div className="flex flex-row gap-[10%]">
                <div>
                  <h4 className="my-3">Current Plan</h4>
                  <h3 className="font-semibold">Premium Monthly</h3>
                  <h5 className="text-slate-700">
                    {`Billed at $ ${settingsData.payment}/month`}
                  </h5>
                  <h4 className="font-semibold">Payment Method</h4>
                  <h5>Visa ending in {}</h5>
                </div>

                <div>
                  <h2>Next Billing Date</h2>
                  <h1>{settingsData.nextPayment}</h1>
                  <p>{`Remaining ${settingsData.date}`}</p>
                </div>
              </div>
            </section>
            <section>
              <div className="flex gap-2 my-5">
                <ArrowRightOnRectangleIcon className="inline-flex w-6 h-6" />
                <h1 className="text-xl font-semibold">Account Activity Log</h1>
              </div>
              <p>A detailed record of actions taken on your account</p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 text-left">Date</td>
                    <td className="px-4 py-2 text-left">Action</td>
                  </tr>
                </thead>
                {settingsData.Activity &&
                  settingsData.Activity.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{activity.date}</td>
                      <td className="px-4 py-2">{activity.action}</td>
                    </tr>
                  ))}
              </table>
            </section>
          </div>
        );
      case "user-preferences": {
        return (
          <>
            <div className="genaralSettings">
              <div className="inline-flex ml-5">
                <GlobeAltIcon className="w-6 h-6 font-bold text-gray-800" />
                <h2 className="font-semibold ">Language</h2>
                {/* <GoogleTranslate /> */}
              </div>
              <div title="Language" icon="language"></div>

              <section>
                <h2 className="flex items-center mb-4 font-semibold">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Theme
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  {options.map((opt) => (
                    <label
                      key={opt}
                      onClick={() => {
                        setTheme(opt);
                        themeSetter(opt.toLowerCase());
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        theme === opt
                          ? " bg-primary/10 text-primary border-blue-600 shadow-md"
                          : "border-gray-300 text-gray-500 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="inline-flex mt-5 ml-5">
                <RocketLaunchIcon className="w-6 h-6 font-bold text-gray-800" />
                <h2 className="font-bold ">Start behaviour</h2>
              </div>
              <div className="mt-8 launch">
                <h3>Launch on system start up </h3>
                <Switch
                  onChange={() => setIsSwitchOn(!isSwitchOn)}
                  checked={isSwitchOn}
                  className="mr-5"
                />
              </div>

              <div className="grid grid-cols-1 gap-2 mt-10">
                <div className="inline-flex">
                  {fontSize === "full" ? (
                    <MagnifyingGlassMinusIcon className="w-6 h-6 font-bold text-gray-800" />
                  ) : (
                    <MagnifyingGlassPlusIcon className="w-6 h-6 font-bold text-gray-800" />
                  )}
                  <h3 className="font-bold">Display scaling</h3>
                </div>

                <select
                  className="w-3/4 h-full transition rounded-lg form-select border-border-light dark:border-border-dark dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary"
                  value={fontSize}
                  onChange={(e) => {
                    fontSetter(e.target.value);
                    setFontSize(e.target.value);
                  }}
                >
                  <option value="16">200%</option>
                  <option value="24">300%</option>
                  <option value="20">250%</option>
                  <option value="12">150%</option>
                  <option value="8">100%</option>
                  <option value="4">50%</option>
                  <option value="2">20%</option>
                </select>
              </div>
              <div className="inline-flex mt-5 ml-5">
                {isSoundOn ? (
                  <SpeakerWaveIcon className="w-6 h-6 font-bold text-gray-800" />
                ) : (
                  <SpeakerXMarkIcon className="w-6 h-6 font-bold text-gray-800" />
                )}
                <h3 className="font-bold">Sound Preference</h3>
              </div>
              <div className="grid grid-cols-1 bg-white p-[2%] text-black rounded-lg">
                <div className="mt-8 launch">
                  <h3 className="font-semibold">Enable Sound Effects</h3>
                  <Switch
                    onChange={() => setIsSoundOn(!isSoundOn)}
                    checked={isSoundOn}
                    className="mr-5"
                  />
                </div>
                <div className="inline-flex w-full gap-12 mt-5 ml-5">
                  <SpeakerXMarkIcon className="w-6 h-6 font-bold text-gray-800" />
                  <input
                    type="range"
                    className="w-9/12"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                  <SpeakerWaveIcon className="w-6 h-6 font-bold text-gray-800" />
                </div>
              </div>
              <div className="inline-flex mt-10">
                <ClockIcon className="w-6 h-6" />
                <h3 className="font-bold">Auto Updates</h3>
              </div>
              <div className=" mt-5 ml-5 flex flex-row bg-white p-[2%] rounded-lg">
                <h2 className="font-semibold">Enable AutoUpdates</h2>
                <Switch
                  onChange={() => setIsAutoUpdateOn(!isAutoUpdateOn)}
                  checked={isAutoUpdateOn}
                  className="mr-5"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 mt-10 ">
                <button className="mb-5 font-bold text-red-900">
                  Reset to Default
                </button>
                <button
                  className="font-bold text-white bg-gray-900 w-fit pl-[3%] pr-[3%] rounded-lg
                  hover:bg-gray-700 transition duration-1000 scale-105"
                  onClick={() => saveChanges()}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </>
        );
      }
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
