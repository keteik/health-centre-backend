import { Router } from "express";

const visit = Router();
const visitService = require("./visit.service")

visit.route('/visits')
.post(function(req, res) {
    visitService.createVisit(req, res);
})

visit.route('/visits/completed')
.get(function(req, res) {
    visitService.getCompletedVisits(req, res);
})

visit.route('/visits/unconfirmed')
.get(function(req, res) {
    visitService.getUnconfirmedVisits(req, res);
})

visit.route('/visits/upcoming/:id')
.get(function(req, res) {
    visitService.getUpcomingVisits(req, res);
})

visit.route('/visits/patient/:id')
.get(function(req, res) {
    visitService.getPatientVisits(req, res);
})

visit.route('/visits/doctor/:id')
.get(function(req, res) {
    visitService.getDoctorVisits(req, res);
})

visit.route('/visits')
.put(function(req, res) {
    visitService.confirmVisit(req, res);
})


module.exports = visit;
