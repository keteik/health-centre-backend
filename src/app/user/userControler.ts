import "reflect-metadata";
import {Request, Response} from "express";
import { getManager } from 'typeorm';
import { User } from "../../entity/User";
import { Patient } from "../../entity/Patient";
import { Doctor } from "../../entity/Doctor";
import { error } from "console";

const bcrypt = require('bcrypt');

const createUser = async (req: Request, res: Response) => {
    const userBody:{ id: number, email: string, password: string, role: string } = req.body;
    const patientBody: { id: number, name: string, surname: string, phone: number, pesel: number, age: number, gender: string, user: User, userId: number } = req.body;
    const doctorBody: { id: number, name: string, surname: string, phone: number, specialty: string, age: number, gender: string, user: User, userId: number } = req.body;

    try{
        const entityManager = getManager();

        const userCheck =  await entityManager.findOne(User, {email: req.body.email});
        if(userCheck !== undefined){
            return  res.status(200).json( {"message": "User with that email already exists!"} );
        }

        userBody.password = await bcrypt.hash(req.body.password,10);
        const user =  User.create( userBody );
        await user.save();

        switch(userBody.role){
            case "patient": {
                patientBody.user = user;
                patientBody.userId = user.id;
                const patient = Patient.create( patientBody );
                await patient.save();

                break;
            }
            case "doctor": {
                doctorBody.user = user;
                doctorBody.userId = user.id;
                const doctor = Doctor.create( patientBody );
                await doctor.save();

                break;
            }
            default: {
                throw error;
            }
        }
        
        return res.status(201).json( {
            "id": user.id
        });
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