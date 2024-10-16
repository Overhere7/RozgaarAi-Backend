import { addError } from "../error.js";
import User from "../models/Users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup = async (req, res, next) => {
    try {
        console.log("signup");
        // const checkUser = await User.findOne({ username: req.body.username })
        // if (checkUser) {
        //     return next(addError(400, "Username Already Exist"))
        // }
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) {
            return next(addError(400, "Email Already Exist"))
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hash })
        // console.log(newUser)
        // await newUser.save();
        const user = await User.create(newUser)

        console.log("User signup Is Successful")

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        // console.log(jwtToken)
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
        res.cookie("rozgaar_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
            // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
        }).status(200).json(others);
    }
    catch (err) {
        next(addError(500, 'Not able to create !'))
    }
}


export const login = async (req, res, next) => {
    try {
        console.log("Login");

        // console.log(user);

        const user = await User.findOne({ username: req.body.username })
        // console.log(user)
        if (!user) {
            return next(addError(404, "User Doesn't Exist"))
        }
        // console.log(req.body)

        //Password Check
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        // console.log(req.body.password,user.password)
        // console.log(isPasswordCorrect)

        if (!isPasswordCorrect) {
            return next(addError(400, "Wrong Password"))
            // return res.status(400).send("Wrong Password")
        }
        console.log("User signin Is Successful")

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;
        // console.log(jwtToken)
        const tenYearsFromNow = new Date();
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
        res.cookie("rozgaar_token", jwtToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
            httpOnly: true,
            expires: tenYearsFromNow,
            // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
        }).status(200).json(others);

    }
    catch (err) {
        next(err);
    }
}
export const logout = async (req, res, next) => {
    try {
        return res.cookie('rozgaar_token', '', {
            expire: new Date(0), path: '/',
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: 'none',
        }).status(200).json('Logout');
    }
    catch (err) {
        next(err);
    }
}


export const googlelogin = async (req, res, next) => {
    try {
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) {
            const user = checkEmail
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            // console.log(jwtToken)
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
            return res.cookie("rozgaar_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
                // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
            }).status(200).json(others);
        }
        else {
            const newUser = new User({ ...req.body })
            const user = await User.create(newUser)
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            // console.log(jwtToken)
            const tenYearsFromNow = new Date();
            tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10);
            return res.cookie("rozgaar_token", jwtToken, {
                path: "/",
                secure: true,
                sameSite: 'none',
                httpOnly: true,
                expires: tenYearsFromNow,
                // maxAge: 100 * 365 * 24 * 60 * 60 * 1000, // 100 years in milliseconds
            }).status(200).json(others);

        }

    }
    catch (err) {
        next(err);
    }
}