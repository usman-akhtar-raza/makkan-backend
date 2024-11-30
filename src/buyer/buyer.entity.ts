import { User } from './../user/user.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn()
  Buyer_ID: number;

  @Column('int')
  @ManyToOne(() => User, (user) => user.buyer, { nullable: false })
  @JoinColumn({ name: 'User_ID' })
  User_ID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Created_at: string;

  // @OneToMany(() => Buyer, (buyer) => buyer.user)
  // buyers: Buyer[];
}
