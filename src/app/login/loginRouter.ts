import { Router } from "express";
const passport = require('passport');

import { User } from "../../entity/User"; 

const login = Router();

const initializePassport = require("../../auth/passport-config");

initializePassport(
   passport, 
    email => {
        return "a@b";
    },
    id => {
        return 2;
    }

    //email => User.find(user => User.email === email),
   // email => User.find({ where: {email: email} }),
    //id => users.find(user => user.id === id)
   // id => User.find({ where: {id: id} })
)

login.route('/login')
.get( (req, res) => {
    res.render("../views/login.ejs");
})
.post(function(req, res) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
})

module.exports = login;
