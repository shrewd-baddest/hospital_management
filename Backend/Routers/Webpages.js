import { Router } from "express";
import { getAllUsers, getUserSearch, } from "../Controllers/usersController.js";
import { admissionsOverTime, systemOverview } from "../Controllers/dashboardController.js";
import { addDepartment, getDepartmentById, getDepartments, searchDepartments, updateDepartment } from "../Controllers/departmentsController.js";
import { getAllDoctors ,getDoctorSchedule} from "../Controllers/doctorController.js";
import { getProfile } from "../Controllers/docDetailsController.js";
import { getAppointmentsEvents } from "../Controllers/appointment.js";
import { getBillingOverview } from "../Controllers/billingController.js";
import { getexportData, getgraphdata } from "../Controllers/reportController.js";
 const webpages=Router();
webpages.get('/dashboard',systemOverview)
webpages.get('/users',getAllUsers);
webpages.post('/userSearch',getUserSearch);
webpages.get('/admissionrange',admissionsOverTime);
webpages.get('/departments',getDepartments);
webpages.post('/departmentSearch',searchDepartments);
webpages.post('/addDepartment',addDepartment);
webpages.get('/getDepartmentById/:id',getDepartmentById);
webpages.post('/updateDepartment',updateDepartment);
webpages.get('/doctors',getAllDoctors);
webpages.get('/doctor/schedule/:doctorId',getDoctorSchedule);
webpages.get('/doctor/profile/:doctorId',getProfile);
webpages.get('/appointments/events',getAppointmentsEvents)
webpages.get('/billing',getBillingOverview);
webpages.post('/getdataExport',getexportData);
webpages.post('/getreportdata',getgraphdata);

 
export default webpages