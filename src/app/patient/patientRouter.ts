import { Router } from "express";

const patient = Router();
const patientControler = require("./patientControler")

patient.route('/patients')
.get(function(req, res) {
    patientControler.getPatients(req, res);
})

patient.route('/patients')
.put(function(req, res) {
    patientControler.editPatient(req, res);
})

patient.route('/patients/:id')
.delete(function(req, res) {
    patientControler.deletePatient(req, res);
})

patient.route('/patients/:id')
.get(function(req, res) {
    patientControler.getPatient(req, res);
})

patient.route('/patients/doctor/:id')
.get(function(req, res) {
    patientControler.getDoctorPatients(req, res);
})

module.exports = patient;