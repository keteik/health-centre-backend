import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @CreateDateColumn()
    create_time: Date;
}
