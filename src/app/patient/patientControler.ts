import "reflect-metadata";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Patient } from "../../entity/Patient";
import { Visit } from "../../entity/Visit";
import { Doctor } from "../../entity/Doctor";
import { User } from "../../entity/User";

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

const getDoctorPatients = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    var doctorId: number;

    type doctorPatientsType = {id: number, name: string, surname: string, age: number, gender: string}
    var doctorPatients: doctorPatientsType[] =[];
    var doctorPatientsSet = new Set<string>();

    const entityManager = getManager();

    try{
        const findDoctor =  await entityManager.findOne(Doctor, {userId: userId} );
        if(findDoctor === undefined){
            return  res.status(200).json( {"message": "Doctor does not exists!"} );
        } else {
        doctorId = findDoctor.id;
        }


        const findDoctorVisits =  await entityManager.find(Visit, {
            relations: ["patient", "doctor"],
            where: {
                doctor: {
                    id: doctorId 
                }
            }
        });
    
        if(findDoctorVisits === undefined){
            return  res.status(200).json( {"message": "Patient does not exists!"} );
        } else {
            for(let i = 0; i < findDoctorVisits.length; i++) {
                doctorPatientsSet.add(JSON.stringify({
                    name: findDoctorVisits[i].patient.name,
                    surname: findDoctorVisits[i].patient.surname,
                    age: findDoctorVisits[i].patient.age,
                    gender: findDoctorVisits[i].patient.gender   
                }));
            }

            var i: number = 0;
            doctorPatientsSet.forEach(function(val) {
                doctorPatients.push(JSON.parse(val));
                doctorPatients[i].id = i+1;
                i++;
            })
        }

        return res.status(200).json(doctorPatients);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const editPatient = async (req: Request, res: Response) => {
    const patientBody:{ id: number, name: string, surname: string, age: number, gender: string, pesel: number, phone: number} = req.body;
    
    try{
    const patient = await Patient.update({id: patientBody.id}, patientBody);
        if(patient){
            return res.status(200).json({message: "success"});
        } else {
            return res.status(500).json({error: "Nie ma takeigo pacjenta"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    };
    
}

const deletePatient = async (req: Request, res: Response) => {
    const id = req.params.id;
    const entityManager = getManager();

    try{

        const patient =  await entityManager.findOne(Patient, {
            where: {
                id: id
            }
        });

        const user =  await entityManager.findOne(User, {
            where: {
                id: patient.userId
            }
        });

        await patient.remove();
        await user.remove();

        return res.status(200).json({message: "User deleted successfull", status: "0"});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Something went wrong"});
    }
}

module.exports = { getPatients, getPatient, getDoctorPatients, editPatient, deletePatient }