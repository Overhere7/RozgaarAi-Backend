import express from 'express';
import { googlelogin, login, logout, signup } from '../controllers/authController.js';

// for creating user
const router=express.Router();

// signup user
router.post('/signup',signup)
// signin user
router.post('/login',login)
// google signin
router.post('/googlelogin',googlelogin)
// Logout
router.post('/logout',logout)

export default router;