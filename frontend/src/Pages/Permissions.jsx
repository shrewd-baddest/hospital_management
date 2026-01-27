import React, { useEffect, useState } from "react";

const Permissions = () => {
  const [roleData, setroledata] = useState(null);
  const [selectRole, setselectrole] = useState("Adminstrator");
  const [active, setActive] = useState("permissions");
  const [userrole, setuserrole] = useState(null);
  const [activitylog, setactivitylog] = useState(null);
  const permits =
    roleData && roleData.find((role) => role.role_name === selectRole);

  useEffect(() => {
    fetch("http://localhost:3000/webpages/permissions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        setroledata(response.roles);
        setuserrole(response.users);
        setactivitylog(response.activity);
      });
  }, []);

  const returnRoles = (activeTab) => {
    switch (activeTab) {
      case "permissions":
        return (
          <div>
            {(permits && permits.permissions.split(",")) ||
              [].map((p) => (
                <h2 className="text-slate-900 min-w-[70%] font-semibold mb-5 hover:bg-slate-400 hover:rounded-lg">
                  {p}
                </h2>
              ))}
          </div>
        );
      case "audit-log":
        return (
          <table className={`min-w-full border-collapse border`}>
            <thead>
              <tr>
                <th className="px-4 py-2 border">Area</th>
                <th className="px-4 py-2 border">Action</th>
                <th className="px-4 py-2 border">Record id</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {activitylog &&
                activitylog.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-2 border">{log.table_name}</td>
                    <td className="px-4 py-2 border">{log.action}</td>
                    <td className="px-4 py-2 border">{log.record_id}</td>
                    <td className="px-4 py-2 border">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        );
      default:
        return <h1>SELECT A TAB</h1>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Roles & Permissions</h1>
      <h4 className="mb-8 text-lg font-semibold text-slate-600">
        Manage user roles,assign specific permissions and review audit logs for
        access control changes.
      </h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col mr-1 w-fit">
          <h1 className="text-xl font-semibold text-black">
            Roles Overview - Total Users:
            {userrole &&
              userrole.reduce(
                (total, user) => total + Number(user.total_users),
                0,
              )}
          </h1>
          <hr />
          <button className="px-10 py-1 mt-4 font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-fit">
            + Create New Role
          </button>
          {roleData &&
            roleData.map((role) => (
              <h2
                className="text-slate-900 min-w-[70%] font-semibold mb-5 hover:bg-slate-400 hover:rounded-lg"
                onClick={() => setselectrole(role.role_name)}
                key={role.id}
              >
                {role.role_name}

                <h3>
                  {userrole &&
                    userrole.find((user) => user.role === role.role_name)
                      ?.total_users}
                </h3>
              </h2>
            ))}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-black">Roles</h1>
          <hr />
          <div className="flex flex-row gap-[5%]">
            <section>
              <h4
                className={`${active == "permissions" ? "text-blue-600 underline" : "text-slate-700"} hover:cursor-pointer text-lg font-semibold`}
                onClick={() => {
                  setActive("permissions");
                  returnRoles("permissions");
                }}
              >
                Permissions
              </h4>
            </section>
            <section>
              <h4
                className={`${active === "audit-log" ? "text-blue-600  underline" : "text-slate-700"} hover:cursor-pointer text-lg font-semibold`}
                onClick={() => {
                  setActive("audit-log");
                }}
              >
                Audit Log
              </h4>
            </section>
          </div>
          {active == "audit-log"
            ? returnRoles("audit-log")
            : returnRoles("permissions")}
        </div>
      </div>
    </div>
  );
};

export default Permissions;
