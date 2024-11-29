import { Select } from '@chakra-ui/react';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({unique: true})
  Email: string;

  // @Column()
  // Phone: number;

  @Column()
  Password: string;
}
