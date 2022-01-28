import { Router } from "express";

const prescription = Router();
const prescriptionService = require("./prescription.service");

prescription.route('/prescriptions')
.get(function(req, res) {
    prescriptionService.getPrescriptions(req, res);
})
.post(function(req, res) {
    prescriptionService.createPrescription(req, res);
})

prescription.route('/prescriptions/:id')
.get(function(req, res) {
    prescriptionService.getPrescription(req, res);
})


module.exports = prescription;