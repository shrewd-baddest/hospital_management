import Admin from "./Dashboards/Admin";
import Nurse from "./Dashboards/Nurse";
import Doctor from "./Dashboards/Doctor";

const Dashboard = () => {
  const role = "doctor"; // For testing, replace with localStorage.getItem("role") in production

  const renderDashboard = () => {
    switch (role) {
      case "admin": {
        return <Admin />;
      }

      case "nurse": {
        <Nurse />;
        break;
      }

      case "doctor": {
        <Doctor />;
        break;
      }
      default:
        return <p>Invalid role</p>;
    }
  };

  return <div className="p-5">{renderDashboard()}</div>;
};

export default Dashboard;
