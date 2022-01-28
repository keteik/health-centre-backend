import { Router } from "express";

const user = Router();
const loginService = require("./login.service");

user.route('/login')
.post(loginService.checkNotAuthenticated, loginService.authUser)

user.route('/logout')
.get((req: any, res) => {
    req.logout();
    res.json( {"message": "You have log out!"} );
})

module.exports = user;