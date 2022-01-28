import { Express } from 'express';

const user = require("./app/user/user.controller");
const patient = require("./app/patient/patient.controller");
const register = require("./app/register/register.controller");
const loginService = require("./auth/login.service");
const auth = require("./auth/auth.controller");
const visit = require("./app/visit/visit.controller")
const doctor = require("./app/doctor/doctor.controller")
const prescription = require("./app/prescription/prescription.controller");


const initRoutes = (app: Express) => {
    app.use('/', user);
    app.use('/', patient);
    app.use('/', register);
    app.use('/', auth);
    app.use('/', visit)
    app.use('/', doctor);
    app.use('/', prescription);

    app.get('/', loginService.checkAuthenticated ,(req, res) => {
        res.json( {"message": "You are logged in!"} );
    });
}

module.exports =  { initRoutes };