import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Error in requireSignIn middleware',
            error
        })
    }
}

//admin access 
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModels.findById(req.user._id)
        if (user.role !== 1) {
            console.log("jshksskhkjh");
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'Error in isAdmin middleware',
        })
    }
}