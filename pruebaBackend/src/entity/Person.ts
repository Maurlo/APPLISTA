import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata"; 

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastNameP!: string;

  @Column()
  lastNameM!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;
}
