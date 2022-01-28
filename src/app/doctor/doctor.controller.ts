import { Router } from "express";

const doctor = Router();
const doctorService = require("./doctor.service")

doctor.route('/doctors')
.get(function(req, res) {
    doctorService.getDoctors(req, res);
})

doctor.route('/doctors')
.put(function(req, res) {
    doctorService.editDoctor(req, res);
})

doctor.route('/doctors/:id')
.delete(function(req, res) {
    doctorService.deleteDoctor(req, res);
})

doctor.route('/doctors')
.post(function(req, res) {
    doctorService.getDoctorsBySpecialty(req, res);
})

doctor.route('/doctors/specialties')
.get(function(req, res) {
    doctorService.getSpecialties(req, res);
})

doctor.route('/doctors/:id')
.get(function(req, res) {
    doctorService.getDoctor(req, res);
})

module.exports = doctor;