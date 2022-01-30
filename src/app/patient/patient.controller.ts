import { Router } from "express";

const patient = Router();
const patientService = require("./patient.service");
const userService = require("../user/user.service");

patient.route('/patients')
.get(function(req, res) {
    patientService.getPatients(req, res);
})
.put(function(req, res) {
    patientService.editPatient(req, res);
})
.post(function(req, res) {
    userService.createUser(req, res);
});


patient.route('/patients/:id')
.get(function(req, res) {
    patientService.getPatient(req, res);
})
.delete(function(req, res) {
    patientService.deletePatient(req, res);
})

patient.route('/patients/doctor/:id')
.get(function(req, res) {
    patientService.getPatientsAssignedToDoctor(req, res);
})

module.exports = patient;