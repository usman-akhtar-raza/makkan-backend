import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { House } from './house.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  controllers: [HouseController],
  providers: [HouseService]
})
export class HouseModule {}
