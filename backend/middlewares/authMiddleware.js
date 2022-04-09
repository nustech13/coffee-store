import console from 'console';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.headers.token;
    const refreshToken = req.cookies.refreshToken;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, staff) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }
            req.staff = staff;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.staff.is_admin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
}