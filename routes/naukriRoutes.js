import express from 'express';
import { getNaukri } from '../controllers/naukriController.js';


const router=express.Router();

// get road map
router.get('/get',getNaukri)

// add road map
// router.get('/addroadmap',addRoadMap)




export default router;