import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import cors from "cors";

const loginService = require("./auth/login.service");
const routes = require('./routes.controller');

const app = express();
app.use(cors());
app.options('*', cors());

loginService.setupPassport(app);
routes.initRoutes(app);

createConnection().then(async() => {

    app.listen(5000, () => console.log("Server listening on http://localhost:5000"));

}).catch(error => console.log(error));
