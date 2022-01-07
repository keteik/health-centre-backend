import { Router } from "express";

const visit = Router();
const visitControler = require("./visitControler")

visit.route('/visits')
.post(function(req, res) {
    visitControler.createVisit(req, res);
})

visit.route('/visits/patient/:id')
.get(function(req, res) {
    visitControler.getVisitPatient(req, res);
})

visit.route('/visits/doctor/:id')
.get(function(req, res) {
    visitControler.getVisitDoctor(req, res);
})


module.exports = visit;
