import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { getUser, updateUser, deleteUser, getCurrentUser } from '../controllers/userController.js';
import forge from 'node-forge';
import fs from 'fs';

const router = express.Router();


const privateKeyPem = fs.readFileSync('privateKey.pem', 'utf8');
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);


router.put('/update', verifyToken, updateUser);


router.delete('/delete/:id', verifyToken, deleteUser);


router.get('/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        
        const decryptedEmail = privateKey.decrypt(user.email, 'RSA-OAEP');
        const decryptedPhone = privateKey.decrypt(user.phone, 'RSA-OAEP');
        
       
        res.status(200).json({ ...user._doc, email: decryptedEmail, phone: decryptedPhone });
    } catch (err) {
        res.status(500).json(err.message);
    }
});


router.get('/get', verifyToken, getCurrentUser);

export default router;
