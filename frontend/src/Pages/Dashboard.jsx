import Admin from "./Dashboards/Admin";
import Nurse from "./Dashboards/Nurse";
import Doctor from "./Dashboards/Doctor";
import Patient from "./Dashboards/Patient";

const Dashboard = () => {
  const role = localStorage.getItem("roles");
  const renderDashboard = () => {
    switch (role) {
      case "admin": {
        return <Admin />;
      }

      case "nurse": {
        return <Nurse />;
      }

      case "doctor": {
        return <Doctor />;
      }

      case "patient": {
        return <Patient />;
      }
      default:
        return <p>Invalid role</p>;
    }
  };

  return <div className="w-screen p-5">{renderDashboard()}</div>;
};

export default Dashboard;
