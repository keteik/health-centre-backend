import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

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

}
