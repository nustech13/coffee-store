import bcrypt from 'bcrypt';
import { StaffModel } from '../models/StaffModel.js';
import configCommon from '../config/configCommon.js'

export const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        //create new User
        const newUser = await new StaffModel({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            phone: req.body.phone,
            image: req.body.image
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err);
    }
}


export const Login = async(req, res) => {
    try {
        const user = await StaffModel.findOne({ email: req.body.email });
        
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (user && validPassword) {
            //Generate access token
            const accessToken = configCommon.generateAccessToken(user);
            //Generate refresh token
            const refreshToken = configCommon.generateRefreshToken(user);
            //STORE REFRESH TOKEN IN COOKIE
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/admin",
                sameSite: "strict",
            });
            
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken, refreshToken });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}