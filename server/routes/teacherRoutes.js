import express from "express";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";
import { PRIVATEKEY } from '../utils/constants.js';
import { isAuthicatedTeacher } from "../middleware/auth.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import {catchAsyncError} from "../middleware/catchAsyncError.js";
const router = express.Router();

router.post('/login', catchAsyncError(async function (req, resp, next) {
    let { email, password } = req.body;
    await db.read();

    let teacher = db.data.teachers.find(function (teacher) {
        if (teacher.email == email && teacher.password == password) {
            return true;
        }
        return false;
    });

    if (teacher == undefined) {
        return next(new ErrorHandler(401, "Invalid Email and Password"));
    }

    let token = jwt.sign({ Email: email, User: 'teacher' }, PRIVATEKEY);
    resp.cookie('token', token);
    resp.status(200).send();
}));

router.post('/addresult', isAuthicatedTeacher, catchAsyncError(async function (req, resp, next) {
    let { RollNumber, Name, DateOfBirth, Score } = req.body;
    await db.read();

    let result = db.data.results.find(function (result) {
        if (result.RollNumber == RollNumber) {
            return true;
        }
    });

    if (result == undefined) {
        db.data.results.push({ RollNumber, Name, DateOfBirth, Score });
        await db.write();
        resp.status(201).send();
    } else {
        return next(new ErrorHandler(403, "Result is already exist for this RollNumber"));
    }
}))


router.put('/updateresult', isAuthicatedTeacher, catchAsyncError(async function (req, resp, next) {
    let { RollNumber, Name, DateOfBirth, Score } = req.body;
    await db.read();

    let index = db.data.results.findIndex(function (result) {
        if (result.RollNumber == RollNumber) {
            return true;
        }
    });

    if (index == -1) {
        return next(new ErrorHandler(404, "with this roll number result does not exist"));
    }

    db.data.results[index] = { RollNumber, Name, DateOfBirth, Score };
    await db.write();
    resp.status(204).send();
}))

router.delete('/deleteresult/:id', isAuthicatedTeacher, catchAsyncError(async function (req, resp) {
    let RollNumber = req.params.id;
    await db.read();
    let newStudentArray = db.data.results.filter(function (result) {
        if (result.RollNumber == RollNumber) {
            return false;
        }
        return true;
    });

    db.data.results = newStudentArray;
    await db.write();
    resp.status(204).send();
}));




router.get('/results', isAuthicatedTeacher, catchAsyncError(async function (req, resp) {
    await db.read();
    let results = db.data.results;
    resp.status(200).send(results);
}));


router.get('/getresult/:RollNumber', isAuthicatedTeacher, catchAsyncError(async function (req, resp) {
    let RollNumber = req.params.RollNumber;
    await db.read();
    let result = db.data.results.find(function (result) {
        if (result.RollNumber == RollNumber) {
            return true;
        }
        return false;
    });

    resp.status(200).send(result);
}));

router.get('/isLogin', catchAsyncError(async function (req, resp, next) {
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
        resp.status(200).send(true);
    } else {
        return next(new ErrorHandler(401, "Please Login As Teacher"));
    }
}));



export default router;