import { Router } from "express";

const visit = Router();
const visitControler = require("./visitControler")

visit.route('/visits')
.post(function(req, res) {
    visitControler.createVisit(req, res);
})

visit.route('/visits/completed')
.get(function(req, res) {
    visitControler.getCompletedVisits(req, res);
})

visit.route('/visits/unconfirmed')
.get(function(req, res) {
    visitControler.getUnconfirmedVisits(req, res);
})

visit.route('/visits/upcoming/:id')
.get(function(req, res) {
    visitControler.getUpcomingVisits(req, res);
})

visit.route('/visits/patient/:id')
.get(function(req, res) {
    visitControler.getVisitPatient(req, res);
})

visit.route('/visits/doctor/:id')
.get(function(req, res) {
    visitControler.getVisitDoctor(req, res);
})

visit.route('/visits')
.put(function(req, res) {
    visitControler.confirmVisit(req, res);
})


module.exports = visit;
