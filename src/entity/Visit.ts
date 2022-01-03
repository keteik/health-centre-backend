import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

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
}
