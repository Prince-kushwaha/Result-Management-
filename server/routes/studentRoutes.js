import express from "express";
import { db } from "../database/connection.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
const router = express.Router();

router.post('/searchresult', catchAsyncError(async function (req, resp, next) {
    let { RollNumber, DateOfBirth } = req.body;
    await db.read();
    let result = db.data.results.find((result) => {
        if (result.RollNumber == RollNumber && result.DateOfBirth == DateOfBirth) {
            return true;
        }
    });

    if (result == undefined) {
        return next(new ErrorHandler(401, "Invalid Roll Number and Date of Birth"));
    }

    resp.status(200).send(result);
}));

export default router;