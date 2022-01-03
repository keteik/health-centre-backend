import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Visit } from "./Visit";

@Entity("doctors")
export class Doctor extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: number;

    @Column()
    specialty: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @OneToMany(() => Visit, visit => visit.doctor)
    visits: Visit[];

}
