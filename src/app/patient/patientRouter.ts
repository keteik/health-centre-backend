import { Router } from "express";

const patient = Router();
const patientControler = require("./patientControler")

patient.route('/patients')
.get(function(req, res) {
    patientControler.getPatients(req, res);
})

patient.route('/patients/:id')
.get(function(req, res) {
    patientControler.getPatient(req, res);
})

module.exports = patient;