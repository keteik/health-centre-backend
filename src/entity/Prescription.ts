import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne} from "typeorm";
import { Visit } from "./Visit";

@Entity("prescriptions")
export class Prescription extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    payment: number;

    @CreateDateColumn()
    create_time: Date;

    @ManyToOne(() => Visit, visit => visit.prescriptions)
    visit: Visit

}
