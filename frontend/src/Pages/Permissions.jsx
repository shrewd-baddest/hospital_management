import React, { useEffect, useState } from "react";

const Permissions = () => {
  const [roleData, setroledata] = useState(null);
  const [selectRole, setselectrole] = useState("Adminstrator");
  const [active, setActive] = useState("permissions");
  const [userrole, setuserrole] = useState(null);
  var permits = roleData.find((role) => {
    role.name == selectRole;
  });

  useEffect(() => {
    fetch("http://localhost:3000/webpages/permissions", {
      Headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((data) => data.json)
      .then((res) => {
        const response = res.data;
        setroledata(response.roles);
        setuserrole(response.users);
      });
  });
  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Roles & Permissions</h1>
      <h4 className="mb-8 text-lg font-semibold text-slate-600">
        Manage user roles,assign specific permissions and review audit logs for
        access control changes.
      </h4>
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-black">
            Roles{" "}
            {userrole &&
              userrole.reduce((total, user) => total + user.total_users, 0)}
          </h1>
          <hr />
          <button className="px-5 font-semibold text-center text-white bg-blue-600 hover:bg-blue-700">
            + Create New Role
          </button>
          {roleData &&
            roleData.map((role) => (
              <h2
                className="text-slate-900 min-w-[70%] font-semibold mb-5 hover:bg-slate-400 hover:rounded-lg"
                onClick={setselectrole(role.role_name)}
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
          <section>
            <h4
              className={`${active == "permissions" ? "text-blue-600" : "text-slate-700"}`}
              onClick={setActive("permissions")}
            >
              Permissions
            </h4>
            <div>
              {permits.permissions.split(",").map((p) => (
                <h2 className="text-slate-900 min-w-[70%] font-semibold mb-5 hover:bg-slate-400 hover:rounded-lg">
                  {p}
                </h2>
              ))}
            </div>
          </section>
          <section>
            <h4
              className={`${active == "audit-log" ? "text-blue-600" : "text-slate-700"}`}
              onClick={setActive("audit-log")}
            >
              Audit Log
            </h4>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
