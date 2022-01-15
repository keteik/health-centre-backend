import { Request, Response } from "express";
import { Prescription } from "../../entity/Prescription";
import { Visit } from "../../entity/Visit";
import { getManager } from "typeorm";


const createPrescription = async (req: Request, res: Response) => {
    const prescriptionBody: {name: string, payment: number, visit: Visit}  = req.body;

    const entityManager = getManager();

    const findVisit = await entityManager.findOne(Visit, {id: req.body.visitId});
    if(findVisit === undefined){
        return  res.status(200).json( {"message": "Visit does not exists!"} );
    } else {
        prescriptionBody.visit = findVisit;
    }

    try{
        const prescription = Prescription.create(prescriptionBody);
        await prescription.save();

        return res.status(201).json( {
            id: prescription.id
        });
    } catch(err) {
        return res.status(500).json({error: "Something went wrong!"});
    }
}

const getPrescriptions = async (_: Request, res: Response) => {

    try{
        const prescriptions = await Prescription.find();

        return res.status(200).json(prescriptions);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const getPrescription = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    type prescriptionType = {id: number, name: string, payment: number, create_time: string};
    var prescriptionData: prescriptionType[] = [];

    try{
        const prescriptions = await Prescription.find({ 
            relations: ["visit"],
            where: {
                visit: {
                    id: id
                }
            }
        });
        for(let i = 0; i < prescriptions.length; i++) {
            prescriptionData.push({
                id: prescriptions[i].id = i + 1,
                name: prescriptions[i].name,
                payment: prescriptions[i].payment,
                create_time: new Date(prescriptions[i].create_time).toLocaleDateString()
            })
        }
        
        return res.status(200).json(prescriptionData);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
} 

module.exports = { createPrescription, getPrescriptions, getPrescription }