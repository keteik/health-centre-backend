import { Router } from "express";

const visit = Router();
const visitControler = require("./visitControler")

visit.route('/visits')
.post(function(req, res) {
    visitControler.createVisit(req, res);
})

visit.route('/visits/:id')
.get(function(req, res) {
    visitControler.getVisit(req, res);
})


module.exports = visit;
