import { Router } from "express";

const register = Router();
const userControler = require("../user/userControler");

register.route('/register')
.post(function(req, res) {
    userControler.createUser(req, res);
});

module.exports = register;