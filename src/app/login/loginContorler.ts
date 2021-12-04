const passport = require('passport');

const initializePassport = require('../../auth/passport-config');

import { User } from "../../entity/User"; 

const init = initializePassport(
    passport, 
    //email => User.find(user => User.email === email),
   // email => User.find({ where: {email: email} }),
    //id => users.find(user => user.id === id)
  //  id => User.find({ where: {id: id} })

)

module.exports = { init };
