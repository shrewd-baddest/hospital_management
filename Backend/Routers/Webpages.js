import { Router } from "express";
import { getAllUsers, getUserSearch, } from "../Controllers/usersController.js";
import { admissionsOverTime, systemOverview } from "../Controllers/dashboardController.js";
import { addDepartment, getDepartmentById, getDepartments, searchDepartments, updateDepartment } from "../Controllers/departmentsController.js";
import { getAllDoctors ,getDoctorSchedule} from "../Controllers/doctorController.js";
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

 
export default webpages