import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import cors from "cors";

const loginControler = require("./auth/loginControler");
const routes = require('./routes');

const app = express();
app.use(cors());
app.options('*', cors());

loginControler.setupPassport(app);
routes.initRoutes(app);

createConnection().then(async() => {

    app.listen(5000, () => console.log("Server listening on http://localhost:5000"));

}).catch(error => console.log(error));
