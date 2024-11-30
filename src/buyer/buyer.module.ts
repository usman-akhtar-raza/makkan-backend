import { Module } from '@nestjs/common';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Buyer])],
  controllers: [BuyerController],
  providers: [BuyerService]
})
export class BuyerModule {}
