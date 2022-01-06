import { Request, Response } from "express";
import { Visit } from "../../entity/Visit";
import { getManager } from 'typeorm';
import { Patient } from "../../entity/Patient";
import { Doctor } from "../../entity/Doctor";

const createVisit = async (req: Request, res: Response) => {
    const visitBody: { id: number, date: Date, room: number, status: number, patient: Patient, doctor: Doctor} = req.body;

    const entityManager = getManager();

    const findPatient =  await entityManager.findOne(Patient, {id: req.body.patientId});
    if(findPatient === undefined){
        return  res.status(200).json( {"message": "Patient does not exists!"} );
    } else {
        visitBody.patient = findPatient;
    }

    const findDoctor =  await entityManager.findOne(Doctor, {id: req.body.doctorId});
    if(findDoctor === undefined){
        return  res.status(200).json( {"message": "Doctor does not exists!"} );
    } else {
        visitBody.doctor = findDoctor;
    }

    try{
        const visit = Visit.create( visitBody );
        await visit.save();

        return res.status(201).json( {
            "id": visit.id
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
}

const getVisit = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    type visitType = {id: number, date: string, room: number, status: number, doctor: Object}
    var visitData: visitType[] =[];

    try{
        const visits = await Visit.find({ 
            relations: ["doctor"],
            where: {
                patient: {
                    id: id
                }
            }
        });
        for(let i = 0; i < visits.length; i++) {
            visitData.push({
                id: visits[i].id,
                date: new Date(visits[i].date).toLocaleString(),
                room: visits[i].room,
                status: visits[i].status,
                doctor: {
                    name: visits[i].doctor.name,
                    surname: visits[i].doctor.surname
                }
            })
        }
        return res.status(200).json(visitData);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
} 

module.exports = { createVisit, getVisit }