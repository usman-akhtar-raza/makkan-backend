import { Buyer } from 'src/buyer/buyer.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({ unique: true })
  Email: string;

  // @Column()
  // Phone: number;

  @Column()
  Password: string;

  @OneToMany(() => Buyer, (buyer) => buyer.User_ID)
  buyer: Buyer[];
}
