import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Visit } from "./Visit";

@Entity("patients")
export class Patient extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

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

    @OneToOne(() => User)
    @JoinColumn()
    user: User

}
