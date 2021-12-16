if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import { Express } from 'express';
import { User } from '../entity/User';
import { getManager } from 'typeorm';
import express from 'express';
import session from 'express-session';

const passport = require('passport');
const initializePassport = require('./passport-config');

const setupPassport = (app: Express) => {

    initializePassport(passport,
        async email => {
            const entityManager = getManager();

            return await entityManager.findOne(User, {email: email});
        },
        async id => {
            const entityManager = getManager();

            return await entityManager.findOne(User, {id: id});
        }
    )

    app.use(express.urlencoded({ extended: false}));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })); 
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());

}

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"});
}


const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
}

const auth = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json(info);
        }

        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }
            return res.json({
                "id": user.id,
                "name": user.name,
                "surname": user.surname,
                "role": user.role
            });
        });
    })(req, res, next);
}
module.exports = { setupPassport, checkAuthenticated, checkNotAuthenticated, auth };
