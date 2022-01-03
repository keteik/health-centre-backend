import { Router } from "express";

const user = Router();
const visitControler = require("./visitControler")

user.route('/visits')
.post(function(req, res) {
    visitControler.createVisit(req, res);
})


module.exports = user;
