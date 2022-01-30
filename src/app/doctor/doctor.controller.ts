import { Router } from "express";

const doctor = Router();
const doctorService = require("./doctor.service");
const userService = require("../user/user.service");

doctor.route('/doctors')
.get(function(req, res) {
    doctorService.getDoctors(req, res);
})
.put(function(req, res) {
    doctorService.editDoctor(req, res);
})
.post(function(req, res) {
    userService.createUser(req, res);
});

doctor.route('/doctors/by-specialty')
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
.delete(function(req, res) {
    doctorService.deleteDoctor(req, res);
})





module.exports = doctor;