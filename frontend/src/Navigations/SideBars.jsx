import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  HeartIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const SideBars = () => {
  const roles = localStorage.getItem("roles");
  console.log(roles);
  // const roles = "admin";
  const location = useLocation();
  const site = location.pathname.split("/").filter(Boolean);
  const [roleBasedSidebars, setRoleBasedSidebars] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    switch (roles) {
      case "admin": {
        const catalog = [
          { name: "Dashboard", path: "dashboard", icon: HomeIcon },
          { name: "Users", path: "users", icon: UserGroupIcon },
          {
            name: "Departments",
            path: "departments",
            icon: BuildingOfficeIcon,
          },
          { name: "Doctors", path: "doctors", icon: UserCircleIcon },
          {
            name: "Appointments",
            path: "appointments",
            icon: CalendarDaysIcon,
          },
          { name: "Billing", path: "billing", icon: DocumentTextIcon },
          { name: "Reports", path: "reports", icon: ChartBarIcon },
          {
            name: "Roles & Permissions",
            path: "roles_permissions",
            icon: ShieldCheckIcon,
          },
          { name: "Settings", path: "settings", icon: Cog6ToothIcon },
        ];

        setRoleBasedSidebars(catalog);
        break;
      }
      case "doctor": {
        const catalog = [
          { name: "Dashboard", path: "dashboard", icon: HomeIcon },
          {
            name: "Appointments",
            path: "appointments",
            icon: CalendarDaysIcon,
          },
          { name: "Patients", path: "patients", icon: UsersIcon },
          {
            name: "Medical Records",
            path: "medical-records",
            icon: ClipboardDocumentListIcon,
          },
          { name: "Lab Results", path: "lab-results", icon: BeakerIcon },
          { name: "Profile", path: "profile", icon: UserCircleIcon },
        ];
        setRoleBasedSidebars(catalog);
        break;
      }

      case "nurse": {
        const catalog = [
          { name: "Dashboard", path: "dashboard", icon: HomeIcon },
          { name: "Patients", path: "patients", icon: UsersIcon },
          { name: "Vital Signs", path: "vital-signs", icon: HeartIcon },
          {
            name: "Appointments",
            path: "appointments",
            icon: CalendarDaysIcon,
          },
          {
            name: "Ward & Bed Management",
            path: "ward-bed-management",
            icon: BuildingOffice2Icon,
          },
          { name: "Profile", path: "profile", icon: UserCircleIcon },
        ];
        setRoleBasedSidebars(catalog);
        break;
      }

      case "receptionist": {
        const catalog = [
          { name: "Dashboard", path: "dashboard", icon: HomeIcon },
          {
            name: "Appointments",
            path: "appointments",
            icon: CalendarDaysIcon,
          },
          {
            name: "Patient Registration",
            path: "patient-registration",
            icon: UserCircleIcon,
          },
          { name: "Billing", path: "billing", icon: DocumentTextIcon },
          { name: "Profile", path: "profile", icon: UserCircleIcon },
        ];
        setRoleBasedSidebars(catalog);
        break;
      }
      case "patient": {
        const catalog = [
          { name: "Dashboard", path: "dashboard", icon: HomeIcon },
          {
            name: "My Appointments",
            path: "my-appointments",
            icon: CalendarDaysIcon,
          },
          {
            name: "Medical Records",
            path: "medical-records",
            icon: ClipboardDocumentListIcon,
          },
          { name: "Lab Results", path: "lab-results", icon: BeakerIcon },
          { name: "Billing", path: "billing", icon: DocumentTextIcon },
          { name: "Profile", path: "profile", icon: UserCircleIcon },
        ];
        setRoleBasedSidebars(catalog);
        break;
      }
      default: {
        const catalog = [];
        setRoleBasedSidebars(catalog);
      }
    }
  }, [roles]);

  return (
    <div className="flex-shrink-0 p-3 mr-4 rounded-md shadow-md bg-slate-300 w-fit">
      <section className="catalog">
        <ul className="hidden categories md:grid ">
          {roleBasedSidebars &&
            roleBasedSidebars.map((item, index) => (
              <li className="card" key={index}>
                {item.name == "Dashboard" ? (
                  <Link
                    to={
                      site[site.length - 1] == "dashboard" ? "" : `/dashboard`
                    }
                    className="flex flex-row items-center gap-2 font-bold"
                  >
                    <item.icon className="inline w-5 h-5" />
                    <h4 className="my-4 text-xl">{item.name}</h4>
                  </Link>
                ) : (
                  <Link
                    to={`/dashboard/${item.path.toLowerCase()}`}
                    className="flex flex-row items-center gap-2 font-bold"
                  >
                    <item.icon className="inline w-5 h-5" />
                    <h4 className="my-4 text-xl">{item.name}</h4>
                  </Link>
                )}
              </li>
            ))}
        </ul>
        <div>
          <ul className="grid md:hidden ">
            {roleBasedSidebars.map((item, index) => (
              <li className="card" key={index}>
                {item.name == "Dashboard" ? (
                  <Link
                    to={
                      site[site.length - 1] == "dashboard" ? "" : `/dashboard`
                    }
                    className="flex flex-row items-center gap-2 font-bold"
                  >
                    <item.icon
                      className="inline mb-5 w-7 h-7 md:hidden"
                      title={item.name}
                    />
                    <div
                      className={`hidden ${open ? "grid" : "hidden"} grid-cols-1 gap-4 p-4`}
                    >
                      <h4 className="my-4 text-xl">{item.name}</h4>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to={`/dashboard/${item.path.toLowerCase()}`}
                    className="flex flex-row items-center gap-2 font-bold"
                  >
                    <item.icon
                      className="inline mb-5 w-7 h-7 md:hidden"
                      title={item.name}
                    />
                    <div
                      className={`hidden ${open ? "grid" : "hidden"} grid-cols-1 gap-4 p-4`}
                    >
                      <h4 className="my-4 text-xl">{item.name}</h4>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SideBars;
