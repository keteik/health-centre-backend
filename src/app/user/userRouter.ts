import { Router } from "express";

const user = Router();
const userControler = require("./userControler")

user.route('/users')
.get(function(req, res) {
    userControler.getUsers(req, res);
})
.post(function(req, res) {
    userControler.createUser(req, res);
})
.put()


user.route('/users/:id')
.delete(function(req, res) {
    userControler.deleteUser(req, res);
})

module.exports = user;
