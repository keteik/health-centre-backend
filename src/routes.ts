import { Express } from 'express';

const userRoute = require("./app/user/userRouter");
const patientRoute = require("./app/patient/patientRouter");
const registerRouter = require("./app/register/registerRouter");
const loginControler = require("./auth/loginControler");
const authRouter = require("./auth/authRouter");
const auth = require("./auth/authRouter");
const visitRouter = require("./app/visit/visitRouter")
const doctorRouter = require("./app/doctor/doctorRouter")
const prescriptionRouter = require("./app/prescription/prescriptionRouter");


const initRoutes = (app: Express) => {
    app.use('/', userRoute);
    app.use('/', patientRoute);
    app.use('/', registerRouter);
    app.use('/', auth);
    app.use('/', visitRouter)
    app.use('/', doctorRouter);
    app.use('/', prescriptionRouter);

    app.get('/', loginControler.checkAuthenticated ,(req, res) => {
        res.json( {"message": "You are logged in!"} );
    });
}

module.exports =  { initRoutes };