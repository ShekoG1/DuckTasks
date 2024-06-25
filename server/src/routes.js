import SignIn from './endpoints/SignIn.js';
import SignUp from './endpoints/SignUp.js';
import GetAllTasks from './endpoints/Tasks/GetAllTasks.js';
import CreateTask from './endpoints/Tasks/CreateTask.js';
import GetAllCategories from './endpoints/Categories/GetAllCategories.js';

import express from 'express';
const router = express.Router();

import { config } from 'dotenv';
config({path: '../.env'}); // Load environment vars from .env file

// ENDPOINTS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// AUTH
router.post('/auth/signin', SignIn);
router.post('/auth/signup', SignUp);
router.post('/tasks/', GetAllTasks); // We use get to ensure that the uid is not displayed publically in the network tab
router.post('/tasks/create', CreateTask);
router.get('/category/', GetAllCategories);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TASKS


export default router;