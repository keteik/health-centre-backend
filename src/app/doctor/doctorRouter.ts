import { Router } from "express";

const doctor = Router();
const doctorContorler = require("./doctorControler")

doctor.route('/doctors')
.get(function(req, res) {
    doctorContorler.getDoctors(req, res);
})

doctor.route('/doctors')
.post(function(req, res) {
    doctorContorler.getDoctorsBySpecialty(req, res);
})

doctor.route('/doctors/specialties')
.get(function(req, res) {
    doctorContorler.getSpecialties(req, res);
})

doctor.route('/doctors/:id')
.get(function(req, res) {
    doctorContorler.getDoctor(req, res);
})

module.exports = doctor;