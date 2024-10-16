import express from 'express';
import { addRoadMap, getRoadMap } from '../controllers/roadMapController.js';


const router=express.Router();

// get road map
router.get('/roadmap',getRoadMap)

// add road map
router.get('/addroadmap',addRoadMap)




export default router;