import { addError } from "../error.js";
import User from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import forge from 'node-forge'; // Add node-forge for RSA encryption
import fs from 'fs';

// Load RSA keys
const publicKeyPem = fs.readFileSync('publicKey.pem', 'utf8');
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

// SIGNUP Function
export const signup = async (req, res, next) => {
    try {
        console.log("signup");

        const checkEmail = await User.findOne({ email: req.body.email });
        if (checkEmail) {
            return next(addError(400, "Email Already Exists"));
        }

        // Encrypt email and phone with RSA public key
        const encryptedEmail = publicKey.encrypt(req.body.email, 'RSA-OAEP');
        const encryptedPhone = publicKey.encrypt(req.body.phone, 'RSA-OAEP');

        // Hash the password before storing
        const hash = bcrypt.hashSync(req.body.password, 10);
        
        const newUser = new User({ 
            ...req.body, 
            email: encryptedEmail, // Save encrypted email
            phone: encryptedPhone, // Save encrypted phone
            password: hash 
        });

        const user = await User.create(newUser);

        console.log("User signup Is Successful");

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

        res.cookie("rozgaar_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
        }).status(200).json(others);
    } catch (err) {
        next(addError(500, 'Not able to create user!'));
    }
};

// LOGIN Function
export const login = async (req, res, next) => {
    try {
        console.log("Login");

        // Find the user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(addError(404, "User Doesn't Exist"));
        }

        // Password Check
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(addError(400, "Wrong Password"));
        }

        console.log("User signin Is Successful");

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

        res.cookie("rozgaar_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
        }).status(200).json(others);

    } catch (err) {
        next(err);
    }
};

// LOGOUT Function
export const logout = async (req, res, next) => {
    try {
        return res.cookie('rozgaar_token', '', {
            expire: new Date(0),
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        }).status(200).json('Logout');
    } catch (err) {
        next(err);
    }
};

// Google Login
export const googlelogin = async (req, res, next) => {
    try {
        const checkEmail = await User.findOne({ email: req.body.email });
        if (checkEmail) {
            const user = checkEmail;
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

            return res.cookie("rozgaar_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
            }).status(200).json(others);
        } else {
            const newUser = new User({ ...req.body });
            const user = await User.create(newUser);
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);

            return res.cookie("rozgaar_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
            }).status(200).json(others);
        }

    } catch (err) {
        next(err);
    }
};
