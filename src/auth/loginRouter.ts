import { Router } from "express";

const login = Router();
const loginControler = require("./loginControler");

login.route('/login')
.post(loginControler.checkNotAuthenticated, loginControler.auth)

module.exports = login;