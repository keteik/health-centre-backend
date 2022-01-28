import { Router } from "express";

const patient = Router();
const patientService = require("./patient.service")

patient.route('/patients')
.get(function(req, res) {
    patientService.getPatients(req, res);
})

patient.route('/patients')
.put(function(req, res) {
    patientService.editPatient(req, res);
})

patient.route('/patients/:id')
.delete(function(req, res) {
    patientService.deletePatient(req, res);
})

patient.route('/patients/:id')
.get(function(req, res) {
    patientService.getPatient(req, res);
})

patient.route('/patients/doctor/:id')
.get(function(req, res) {
    patientService.getPatientsAssignedToDoctor(req, res);
})

module.exports = patient;