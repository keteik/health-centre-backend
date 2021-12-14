import "reflect-metadata";
import {Request, Response} from "express";

import { User } from "../../entity/User";
import { Patient } from "../../entity/Patient";
import { Doctor } from "../../entity/Doctor";
import { error } from "console";

const bcrypt = require('bcrypt');

const createUser = async (req: Request, res: Response) => {
    const userBody:{ id, name, surname, email, password, role } = req.body;
    const patientBody: { id, phone, pesel, age, gender} = req.body;
    const doctorBody: { id, phone, specialty, age, gender} = req.body;
    const adminBody: { id, phone, specialty, age, gender} = req.body;

    try{
        userBody.password = await bcrypt.hash(req.body.password,10);
        const user = User.create( userBody );

        switch(userBody.role){
            case "admin": {

                break;
                
            }

            case "patient": {
                const patient = Patient.create( patientBody );
                await patient.save();
                break;
            }

            case "doctor": {
                const doctor = Doctor.create( doctorBody );
                await doctor.save();
                break;
            }
            default: {
                throw error;
            }
        }
        
        await user.save();
        return res.status(201).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const getUsers = async (_: Request, res: Response) => {

    try{
        const users = await User.find();

        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

/*const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const  patient_body:{ name, surname, email, password, role } = req.body;
 
    try{

        const user = await User.findOneOrFail(id);
        user.name = username || user.username;
        user.password = password || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        return res.json(user)

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    }
}*/

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{

        const user = await User.findOneOrFail(id);
        const patient = await Patient.findOneOrFail(id);
        
        await user.remove();
        await patient.remove();

        return res.status(200).json({message: "User deleted successfullt"});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    }
}

module.exports = { createUser, getUsers, /*updateUser,*/ deleteUser }