import { Router } from "express";

const doctor = Router();
const doctorContorler = require("./doctorControler")

doctor.route('/doctors')
.get(function(req, res) {
    doctorContorler.getDoctors(req, res);
})

doctor.route('/doctors/:id')
.get(function(req, res) {
    doctorContorler.getDoctor(req, res);
})

module.exports = doctor;