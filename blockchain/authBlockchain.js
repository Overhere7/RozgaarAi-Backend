// import { addError } from "../error.js";
// import User from "../models/Users.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import forge from 'node-forge'; // RSA encryption
// import fs from 'fs';
// import authChain from '../blockchain/authBlockchain.js'; // Import the blockchain

// // Load RSA keys
// const publicKeyPem = fs.readFileSync('publicKey.pem', 'utf8');
// const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

// // SIGNUP Function
// export const signup = async (req, res, next) => {
//     try {
//         console.log("signup");

//         const checkEmail = await User.findOne({ email: req.body.email });
//         if (checkEmail) {
//             return next(addError(400, "Email Already Exists"));
//         }

//         // Encrypt email and phone with RSA public key
//         const encryptedEmail = publicKey.encrypt(req.body.email, 'RSA-OAEP');
//         const encryptedPhone = publicKey.encrypt(req.body.phone, 'RSA-OAEP');

//         // Hash the password before storing
//         const hash = bcrypt.hashSync(req.body.password, 10);
        
//         const newUser = new User({ 
//             ...req.body, 
//             email: encryptedEmail, // Save encrypted email
//             phone: encryptedPhone, // Save encrypted phone
//             password: hash 
//         });

//         const user = await User.create(newUser);

//         console.log("User signup Is Successful");

//         const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
//         const { password, ...others } = user._doc;
//         const tenYearsFromNow = new Date();
//         tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

//         res.cookie("rozgaar_token", jwtToken, {
//             path: "/",
//             secure: true,
//             sameSite: 'none',
//             httpOnly: true,
//             expires: tenYearsFromNow,
//         }).status(200).json(others);

//         // Blockchain: Add the new user data to the blockchain
//         const newBlock = new Block(
//             authChain.chain.length, // Index of the new block
//             new Date().toISOString(), // Current timestamp
//             {
//                 email: req.body.email, // Encrypted email stored in the blockchain
//                 publicKey: publicKeyPem // Store the public key in the blockchain
//             }
//         );

//         // Add the new block to the blockchain
//         authChain.addBlock(newBlock);
//         console.log("New block added to the blockchain for user signup");

//         if (authChain.isChainValid()) {
//             console.log('Blockchain is valid');
//         } else {
//             console.log('Blockchain has been tampered with');
//         }

//     } catch (err) {
//         next(addError(500, 'Not able to create user!'));
//     }
    
// };
