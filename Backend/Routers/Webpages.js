import { Router } from "express";
import {
  getAllUsers,
  getUserSearch,
} from "../Controllers/admin/usersController.js";
import {
  admissionsOverTime,
  systemOverview,
} from "../Controllers/admin/dashboardController.js";
import {
  addDepartment,
  getDepartmentById,
  getDepartments,
  searchDepartments,
  updateDepartment,
} from "../Controllers/admin/departmentsController.js";
import {
  getAllDoctors,
  getDoctorSchedule,
} from "../Controllers/admin/doctorController.js";
import { getProfile } from "../Controllers/admin/docDetailsController.js";
import { getAppointmentsEvents } from "../Controllers/admin/appointment.js";
import { getBillingOverview } from "../Controllers/admin/billingController.js";
import {
  getexportData,
  getgraphdata,
} from "../Controllers/admin/reportController.js";
import { getPermissions } from "../Controllers/admin/permissionController.js";
import upload from "../Middlewares/multer.js";
import {
  getNotifications,
  getSettings,
  updateNotificationById,
  updateSettings,
} from "../Controllers/admin/systemController.js";
import {
  getPreference,
  updatePreference,
} from "../Controllers/admin/preference.js";
import { getdashboardDetails } from "../Controllers/doctor/dashboardController.js";
const webpages = Router();
webpages.get("/dashboard", systemOverview);
webpages.get("/users", getAllUsers);
webpages.post("/userSearch", getUserSearch);
webpages.get("/admissionrange", admissionsOverTime);
webpages.get("/departments", getDepartments);
webpages.post("/departmentSearch", searchDepartments);
webpages.post("/addDepartment", addDepartment);
webpages.get("/getDepartmentById/:id", getDepartmentById);
webpages.post("/updateDepartment", updateDepartment);
webpages.get("/doctors", getAllDoctors);
webpages.get("/doctor/schedule/:doctorId", getDoctorSchedule);
webpages.get("/doctor/profile/:doctorId", getProfile);
webpages.get("/appointments/events", getAppointmentsEvents);
webpages.get("/billing", getBillingOverview);
webpages.post("/getdataExport", getexportData);
webpages.post("/getreportdata", getgraphdata);
webpages.get("/permissions", getPermissions);
webpages.post("/hospital-info", upload.single("logo"), updateSettings);
webpages.get("/hospital-info", getSettings);
webpages.get("/notifications/:id", updateNotificationById);
webpages.get("/notifications", getNotifications);
webpages.get("/user_preferences", getPreference);
webpages.post("/user_preferences", updatePreference);
webpages.get("/doctor/dashboard", getdashboardDetails);

export default webpages;
