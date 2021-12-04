import { Router } from "express";

const patient = Router();
const patientControler = require("./patientControler")

patient.route('/patients')
.get(function(req, res) {
    patientControler.getPatients(req, res);
})

module.exports = patient;