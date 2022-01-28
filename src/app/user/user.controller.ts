import { Router } from "express";

const user = Router();
const userService = require("./user.service")
const loginService = require("../../auth/login.service");

user.route('/users')
.get(loginService.checkAuthenticated, function(req, res) {
    userService.getUsers(req, res);
})
.post(function(req, res) {
    userService.createUser(req, res);
})
.put()


user.route('/users/:id')
.delete(function(req, res) {
    userService.deleteUser(req, res);
})

module.exports = user;
