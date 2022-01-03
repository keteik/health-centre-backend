import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Visit } from "./Visit";

@Entity("patients")
export class Patient extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: number;

    @Column()
    pesel: number;

    @Column()
    age: number;

    @Column()
    gender: string;

    @OneToMany(() => Visit, visit => visit.patient)
    visits: Visit[];

}
