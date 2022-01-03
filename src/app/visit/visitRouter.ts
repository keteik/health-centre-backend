import { Router } from "express";

const user = Router();
const visitControler = require("./visitControler")

user.route('/visits')
.post(function(req, res) {
    visitControler.createVisit(req, res);
})

user.route('/visits/:id')
.get(function(req, res) {
    visitControler.getVisit(req, res);
})


module.exports = user;
