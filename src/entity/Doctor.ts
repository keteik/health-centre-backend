import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Visit } from "./Visit";

@Entity("doctors")
export class Doctor extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

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

    @OneToOne(() => User)
    @JoinColumn()
    user: User

}
