import { Router } from "express";

const prescription = Router();
const prescriptionContoler = require("./prescriptionControler");

prescription.route('/prescriptions')
.get(function(req, res) {
    prescriptionContoler.getPrescriptions(req, res);
})
.post(function(req, res) {
    prescriptionContoler.createPrescription(req, res);
})

prescription.route('/prescriptions/:id')
.get(function(req, res) {
    prescriptionContoler.getPrescription(req, res);
})


module.exports = prescription;