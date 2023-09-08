import express from "express";
import cors from 'cors';
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from './routes/teacherRoutes.js';
import bodyParser from "body-parser";
import { errorMiddleware } from './middleware/error.js'
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());


app.get('/api/logout', function (req, resp) {
    resp.clearCookie('token');
    resp.status(200).send();
});

app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use(errorMiddleware);
app.listen(port, function () {
    console.log("app running on the port " + port);
})
