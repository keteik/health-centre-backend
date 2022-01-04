import "reflect-metadata";
import {Request, Response} from "express";

import { Doctor } from "../../entity/Doctor";

const getDoctors = async (_: Request, res: Response) => {

    try{
        const doctors = await Doctor.find();

        return res.status(200).json(doctors);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const getDoctor = async (req: Request, res: Response) => {

    const id = req.params.id;


    try{
        const users = await Doctor.find({
            where: {
                id: id
            }
        });

        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
} 


module.exports = { getDoctors, getDoctor }