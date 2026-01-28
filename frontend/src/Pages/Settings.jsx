import React, { useEffect } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState("hospital-info");
  const [settingsData, setSettingsData] = React.useState(null);
  const [EditMode, setEditMode] = React.useState(false);
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
      });
  }, [activeTab]);

  const settingsRender = () => {
    switch (activeTab) {
      case "hospital-info":
        return (
          <div>
            <h4>General Information</h4>
            <p>Manage your hospital system configurations and settings here.</p>
            <form
              className="grid grid-cols-1 mt-5 gap-[5%] lg:max-w-[70%] mb-9"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  ...Object.fromEntries(formData.entries()),
                };

                fetch("http://localhost:3000/webpages/hospital-info", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(updatedData),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setSettingsData(data);
                    setEditMode(false);
                  });
              }}
            >
              <section className="grid grid-cols-1">
                <label htmlFor="Hospital Name">Hospital Name</label>
                <input
                  type="text"
                  id="Hospital Name"
                  value={settingsData?.Name || ""}
                  name="Name"
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>

              <section className="grid grid-cols-1">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  id="Address"
                  value={settingsData?.Address || ""}
                  name="Address"
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>

              <section className="grid grid-cols-1">
                <label htmlFor="Contact Number">Contact Number</label>
                <input
                  type="text"
                  id="Contact Number"
                  value={settingsData?.ContactNumber || ""}
                  name="ContactNumber"
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>

              <section className="grid grid-cols-1">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={settingsData?.Email || ""}
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>
              <section className="grid grid-cols-1">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  value={settingsData?.Email || ""}
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>

              <section className="grid grid-cols-1">
                <label htmlFor="Hospital logo">Hospital logo</label>
                <img src={settingsData?.logo} alt="Hospital Logo" />
                <input
                  type="image"
                  id="Hospital logo"
                  value="New Logo"
                  name="logo"
                  className="lg:max-w-[60%]"
                  readOnly={!EditMode}
                />
              </section>
              <section className="flex flex-row gap-[6%] mt-5 pb-9">
                <button
                  onClick={() => setEditMode(!EditMode)}
                  className="px-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
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
        return <div>Notifications Settings</div>;
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
      <h1>Settings</h1>
      <h5>Manage your hospital system configurations</h5>
      <ul className="flex flex-row min-w-fit gap-[5%] mt-5 font-medium list-inside text-slate-700 bg-slate-200 px-[6%] lg:max-w-[80%] rounded-lg py-2">
        <li
          className="cursor-pointer hover:bg-slate-300"
          onClick={() => setActiveTab("hospital-info")}
        >
          Hospital info
        </li>
        <li
          className="cursor-pointer hover:bg-slate-300"
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </li>
        <li
          className="cursor-pointer hover:bg-slate-300"
          onClick={() => setActiveTab("account")}
        >
          Account
        </li>
        <li
          className="cursor-pointer hover:bg-slate-300"
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
