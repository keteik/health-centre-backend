import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Prescription } from "./Prescription";

@Entity("visits")
export class Visit extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    room: number;

    @Column()
    status: number;

    @ManyToOne(() => Patient, patient => patient.visits)
    patient: Patient
    
    @ManyToOne(() => Doctor, doctor => doctor.visits)
    doctor: Doctor

    @OneToMany(() => Prescription, prescription => prescription.visit)
    prescriptions: Prescription[];

    @Column()
    patientId: number;

    @Column()
    doctorId: number;
}
