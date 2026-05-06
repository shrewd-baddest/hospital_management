import React, { useEffect, useRef, useState } from "react";

const Permissions = () => {
  const [roleData, setRoleData] = useState([]);
  const [selectRole, setSelectRole] = useState("Administrator");
  const [active, setActive] = useState("permissions");
  const [userRole, setUserRole] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState true;

  const loaderRef = useRef(null);

  const permits = roleData.find(
    (role) => role.role_name === selectRole
  );

  // ✅ FETCH FUNCTION (FIXED)
  const fetchLogs = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/webpages/permissions?cursor=${cursor ?? ""}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const response = await res.json();

      setCursor(response.nextCursor);
      setHasMore(!!response.nextCursor);

      setRoleData(response.roles || []);
      setUserRole(response.users || []);

      // ✅ Append only when cursor exists
      if (!cursor) {
        setActivityLog(response.activity || []);
      } else {
        setActivityLog((prev) => [...prev, ...(response.activity || [])]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchLogs();
  }, []);

  // ✅ INTERSECTION OBSERVER (FIXED)
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchLogs();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, cursor]);

  // ✅ RENDER FUNCTION (FIXED)
  const returnRoles = () => {
    if (active === "permissions") {
      return (
        <div>
          {permits?.permissions
            ?.split(",")
            .map((p, i) => (
              <h2
                key={i}
                className="text-slate-900 font-semibold mb-3 hover:bg-slate-200 rounded-lg"
              >
                {p}
              </h2>
            ))}
        </div>
      );
    }

    if (active === "audit-log") {
      return (
        <>
          <table className="min-w-full border-collapse border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Area</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Record ID</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((log) => (
                <tr key={log.id}>
                  <td className="border px-4 py-2">{log.table_name}</td>
                  <td className="border px-4 py-2">{log.action}</td>
                  <td className="border px-4 py-2">{log.record_id}</td>
                  <td className="border px-4 py-2">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ SCROLL TRIGGER */}
          <div ref={loaderRef} className="h-10"></div>
        </>
      );
    }

    return null;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Roles & Permissions</h1>

      <div className="grid grid-cols-[1fr_2.5fr] gap-4 mt-4">
        {/* LEFT SIDE */}
        <div>
          <h2 className="font-semibold mb-2">
            Total Users:{" "}
            {userRole.reduce(
              (total, u) => total + Number(u.total_users || 0),
              0
            )}
          </h2>

          {roleData.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectRole(role.role_name)}
              className="cursor-pointer mb-3 p-2 hover:bg-slate-200 rounded"
            >
              <h3>{role.role_name}</h3>
              <small>
                {
                  userRole.find((u) => u.role === role.role_name)
                    ?.total_users
                }
              </small>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="flex gap-6 mb-4">
            <button
              className={active === "permissions" ? "underline" : ""}
              onClick={() => setActive("permissions")}
            >
              Permissions
            </button>

            <button
              className={active === "audit-log" ? "underline" : ""}
              onClick={() => setActive("audit-log")}
            >
              Audit Log
            </button>
          </div>

          {returnRoles()}
        </div>
      </div>
    </div>
  );
};

export default Permissions;