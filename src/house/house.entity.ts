import { Entity, Column, PrimaryGeneratedColumn, Binary } from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  House_ID: number;

  @Column()
  User_ID: number;

  @Column()
  Price: number;

  @Column()
  Status: string;

  @Column()
  Category:string

  @Column()
  Location:string;

  @Column('blob')
  Image:Buffer
}
