import express from 'express';
import { generateResume } from '../controllers/generateResume.js';


const router=express.Router();

// get road map
router.get('/generate/:id',generateResume)




export default router;