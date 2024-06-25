import SignIn from './endpoints/SignIn.js';

import express from 'express';
const router = express.Router();

import { config } from 'dotenv';
config({path: '../.env'}); // Load environment vars from .env file

// ENDPOINTS
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// AUTH
router.post('/signin', SignIn)

export default router;