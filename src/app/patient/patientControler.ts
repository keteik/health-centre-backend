import "reflect-metadata";
import {Request, Response} from "express";

import { Patient } from "../../entity/Patient";

const getPatients = async (_: Request, res: Response) => {

    try{
        const patients = await Patient.find();

        return res.status(200).json(patients);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const getPatient = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{
        const patient = await Patient.findOne(id);

        return res.status(200).json(patient);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

module.exports = { getPatients, getPatient }