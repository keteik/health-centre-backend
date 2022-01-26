import { Router } from "express";

const authUser = Router();
const loginControler = require("./loginControler");

authUser.route('/login')
.post(loginControler.checkNotAuthenticated, loginControler.auth)

authUser.route('/logout')
.get((req: any, res) => {
    req.logout();
    res.json( {"message": "You have log out!"} );
})

module.exports = authUser;