import bcrypt from 'bcrypt';
import { CustomerModel } from '../models/CustomerModel.js';

export const Register = async (req, res) => {
    try {
        const userEmail = await CustomerModel.findOne({ email: req.body.email });
        const userPhone = await CustomerModel.findOne({ phone: req.body.phone });
        const result = {
            success: true,
            mess: "Đăng ký thành công"
        }
        if(!userEmail && !userPhone){
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = await new CustomerModel({
                name: req.body.name,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                image: req.body.image
            });
            await newUser.save();
            res.status(200).json(result);
        }else if(userEmail){
            result.mess = "Email đã tồn tại";
            result.success = false;
            res.status(200).json(result);
        }
        else if(userPhone){
            result.mess = "Số điện thoại đã tồn tại";
            result.success = false;
            res.status(200).json(result);
        }
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