import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

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

}
