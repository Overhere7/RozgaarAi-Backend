import express from 'express';
import { verifyToken } from '../verifyToken.js';

import { getUser, updateUser, deleteUser, getCurrentUser} from '../controllers/userController.js';

const router=express.Router();

// Update a User
router.put('/update',verifyToken,updateUser)
// delete a user
router.delete('/delete/:id',verifyToken,deleteUser)
// find or get a user
router.get('/get/:id',getUser)
// find or get current a user
router.get('/get',verifyToken,getCurrentUser)




export default router;