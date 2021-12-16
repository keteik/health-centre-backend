import { Router } from "express";
import { logout } from "passport";
const logout = Router();

logout.route('/logout')
.get((req: any, res) => {
    req.logout();
    res.json( {"message": "You have log out!"} );
})

module.exports = logout;