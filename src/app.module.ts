import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { House } from './house/house.entity';
import { BuyerModule } from './buyer/buyer.module';
import { Buyer } from './buyer/buyer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'MakkanEstate',
      entities: [User,House, Buyer],
      synchronize: false, // set to false in production
    }),
    UserModule,
    HouseModule,
    BuyerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
