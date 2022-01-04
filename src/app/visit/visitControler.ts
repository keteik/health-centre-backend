import { Request, Response } from "express";
import { Visit } from "../../entity/Visit";
import { getManager } from 'typeorm';
import { Patient } from "../../entity/Patient";
import { Doctor } from "../../entity/Doctor";

const createVisit = async (req: Request, res: Response) => {

    const entityManager = getManager();

    const findPatient =  await entityManager.findOne(Patient, {id: req.body.patientId});
    if(findPatient == undefined){
        return  res.status(200).json( {"message": "Patient does not exists!"} );
    }

    const findDoctor =  await entityManager.findOne(Doctor, {id: req.body.doctorId});
    if(findDoctor == undefined){
        return  res.status(200).json( {"message": "Doctor does not exists!"} );
    }

    const visit = new Visit();
    visit.date = req.body.date;
    visit.room = req.body.room;
    visit.status = req.body.status;
    visit.patient = findPatient;
    visit.doctor = findDoctor;


    try{
      
       await entityManager.save(visit);

        return res.status(201).json( {
            "id": visit.id
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
}

const getVisit = async (req: Request, res: Response) => {

    const id = req.params.id;


    try{
        const visits = await Visit.find({ 
            relations: ["doctor"],
            where: {
                patient: {
                    id: id
                }
            }
        });
        return res.status(200).json(visits);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
} 

module.exports = { createVisit, getVisit }