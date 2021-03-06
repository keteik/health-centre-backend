import e, { Request, Response } from "express";
import { Visit } from "../../entity/Visit";
import { Equal, getManager, Not } from 'typeorm';
import { Patient } from "../../entity/Patient";
import { Doctor } from "../../entity/Doctor";

const createVisit = async (req: Request, res: Response) => {
    const visitBody: { id: number, date: Date, room: number, status: number, patient: Patient, doctor: Doctor, patientId: number, doctorId: number, userId: number} = req.body;

    const entityManager = getManager();

    if(visitBody.userId) {
        const findPatient =  await entityManager.findOne(Patient, {
            where: {
                userId: visitBody.userId
            }
        });
        if(findPatient === undefined){
            return  res.status(200).json( {"message": "Patient does not exists!"} );
        } else {
            visitBody.patientId = findPatient.id;
            visitBody.room = 0;
        }

    } else {
        const findPatient =  await entityManager.findOne(Patient, {id: req.body.patientId});
        if(findPatient === undefined){
            return  res.status(200).json( {"message": "Patient does not exists!"} );
        } else {
            visitBody.patient = findPatient;
            visitBody.patientId = findPatient.id;
        }

        const findDoctor =  await entityManager.findOne(Doctor, {id: req.body.doctorId});
        if(findDoctor === undefined){
            return  res.status(200).json( {"message": "Doctor does not exists!"} );
        } else {
            visitBody.doctor = findDoctor;
            visitBody.doctorId = findDoctor.id;
        }
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

const getPatientVisits = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    var patientId: number;

    type visitType = {id: number, date: string, room: number, status: number, doctor: Object}
    var visitData: visitType[] =[];

    const entityManager = getManager();
    const findPatient =  await entityManager.findOne(Patient, {userId: userId} );
    if(findPatient === undefined){
        return  res.status(200).json( {"message": "Patient does not exists!"} );
    } else {
       patientId = findPatient.id;
    }

    try{
        const visits = await Visit.find({ 
            relations: ["doctor"],
            where:{
                patientId: patientId,
                status: Equal(2)
            }
        });

        for(let i = 0; i < visits.length; i++) {
            visitData.push({
                id: visits[i].id = (i + 1),
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

const getDoctorVisits = async (req: Request, res: Response) => {
    var userId: number = parseInt(req.params.id);
    var doctorId: number;

    type visitType = { id: number, visitNumber: number, date: string, room: number, status: number, patient: Object }
    var visitData: visitType[] =[];

    const entityManager = getManager();
    const findDoctor =  await entityManager.findOne(Doctor, {userId: userId} );
    if(findDoctor === undefined){
        return  res.status(200).json( {"message": "Patient does not exists!"} );
    } else {
       doctorId = findDoctor.id;
    }

    try{
        const visits = await Visit.find({ 
            relations: ["patient"],
            where: {
                doctorId: doctorId,
                status: Equal(2)
            }
        });

        for(let i = 0; i < visits.length; i++) {
            visitData.push({
                id: visits[i].id,
                visitNumber: i+1,
                date: new Date(visits[i].date).toLocaleString(),
                room: visits[i].room,
                status: visits[i].status,
                patient: {
                    name: visits[i].patient.name,
                    surname: visits[i].patient.surname
                }
            })
        }
        return res.status(200).json(visitData);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const getUpcomingVisits = async (req: Request, res: Response) => {
    var userId: number = parseInt(req.params.id);
    var doctorId: number;

    type visitType = { id: number, visitNumber: number, date: string, room: number, status: number, patient: Object }
    var visitData: visitType[] =[];

    const entityManager = getManager();
    const findDoctor =  await entityManager.findOne(Doctor, {userId: userId} );
    if(findDoctor === undefined){
        return  res.status(200).json( {"message": "Patient does not exists!"} );
    } else {
       doctorId = findDoctor.id;
    }

    try{
        const visits = await Visit.find({ 
            relations: ["patient"],
            where: {
                doctorId: doctorId,
                status: Equal(1)
            },
            order: {
                date: "ASC"
            }
        });

        for(let i = 0; i < visits.length; i++) {
            visitData.push({
                id: visits[i].id,
                visitNumber: i+1,
                date: new Date(visits[i].date).toLocaleString(),
                room: visits[i].room,
                status: visits[i].status,
                patient: {
                    name: visits[i].patient.name,
                    surname: visits[i].patient.surname
                }
            })
        }
        return res.status(200).json(visitData);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const confirmVisit = async (req: Request, res: Response) => {
    const id = req.body.id;
    const room = req.body.room;
    var status: number = 0;

    try{
        
        if(room) {
            const visits = await Visit.update({id: id}, {status: 1, room: room});
            status = 1;
        } else {
            const visits = await Visit.update({id: id}, {status: 2});
            status = 2;
        }
        return res.status(200).json({message: "Wizyta potwierdzona !", status: status});
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    }; 
}



const getCompletedVisits = async (_: Request, res: Response) => {
    try{
        const visits =  await Visit.find({
            where: {
                status: 2
            },
            relations: ["doctor", "patient"]
        });

        var i: number = 1;
        for(var index in visits) {
            visits[index].id = i;
            i++;
        }

        return res.status(200).json(visits);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };  
}

const getUnconfirmedVisits = async (_: Request, res: Response) => {
    try{
        const visits =  await Visit.find({
            where: {
                status: 0
            },
            relations: ["doctor", "patient"]
        });
        return res.status(200).json(visits);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };  
}

module.exports = { createVisit, getPatientVisits, getDoctorVisits, getUpcomingVisits, confirmVisit, getCompletedVisits, getUnconfirmedVisits }