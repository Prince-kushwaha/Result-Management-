import jwt from "jsonwebtoken";
import { PRIVATEKEY } from "../utils/constants.js";
import { db } from "../database/connection.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export async function isAuthicatedTeacher(req, resp, next) {
    let token = req.cookies.token;

    if (token == undefined) {
        return next(new ErrorHandler(401, "Please Login As Teacher"));
    }

    await db.read();
    let { Email, User } = jwt.verify(token, PRIVATEKEY);

    if (User !== 'teacher') {
        return next(new ErrorHandler(401, "Please Login As Teacher"));
    }

    let teacher = db.data.teachers.find(function (teacher) {
        if (teacher.email == Email) {
            return true;
        }
    });



    if (teacher != undefined) {
        next();
    } else {
        return next(new ErrorHandler(401, "Please Login As Teacher"));
    }
}


