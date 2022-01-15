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

const getDoctorsBySpecialty = async (req: Request, res: Response) => {

    const specialty = req.body.specialty;
    try{
        const doctors = await Doctor.find({
            where: {
                specialty: specialty
            }
        });

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

const getSpecialties = async (req: Request, res: Response) => {
    var specialtiesData: string[] =[];
    var specialtiesSet = new Set<string>();

    try{
        const specialties = await Doctor.find({ select: ["specialty"] });

        if(specialties === undefined){
            return  res.status(200).json( {"message": "No specialities"} );
        } else {
            for(let i = 0; i < specialties.length; i++) {
                specialtiesSet.add(JSON.stringify({
                    specialty: specialties[i].specialty,  
                }));
            }

            var i: number = 0;
            specialtiesSet.forEach(function(val) {
                specialtiesData.push(JSON.parse(val));
                i++;
            })
        }

        return res.status(200).json(specialtiesData);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

module.exports = { getDoctors, getDoctor, getDoctorsBySpecialty, getSpecialties }