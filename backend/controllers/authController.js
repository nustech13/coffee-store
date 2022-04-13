import bcrypt from 'bcrypt';
import { CustomerModel } from '../models/CustomerModel.js';

export const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        //create new User
        const newUser = await new CustomerModel({
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
        const user = await CustomerModel.findOne({ email: req.body.email });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (user && validPassword) {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}