import { Router } from "express";
import { getAllUsers, getUserSearch, } from "../Controllers/usersController.js";
import { systemOverview } from "../Controllers/dashboardController.js";
const webpages=Router();
webpages.get('/dashboard',systemOverview)
webpages.get('/users',getAllUsers);
webpages.post('/userSearch',getUserSearch);

export default webpages