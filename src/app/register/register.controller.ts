import { Router } from "express";

const register = Router();
const userService = require("../user/user.service");

register.route('/register')
.post(function(req, res) {
    userService.createUser(req, res);
});

module.exports = register;