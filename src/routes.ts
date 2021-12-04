import { Express } from 'express';

const userRoute = require("./app/user/userRouter");
const patientRoute = require("./app/patient/patientRouter");
const registerRouter = require("./app/register/registerRouter");
const loginRouter = require("./auth/loginRouter");
const loginControler = require("./auth/loginControler");


const initRoutes = (app: Express) => {
    app.use('/', userRoute);
    app.use('/', patientRoute);
    app.use('/', loginRouter);
    app.use('/', registerRouter);

    app.get('/', loginControler.checkAuthenticated ,(req, res) => {
        res.json( {"message": "You are logged in!"} );
    });
}

module.exports =  { initRoutes };