// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { User } from './user.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';


// @Module({
//   imports: [
//         TypeOrmModule.forFeature([User]),
//         // JwtModule.register({
//         //   global: true,
//         //   secret: jwtConstants.secret,
//         //   signOptions: { expiresIn: '30m' },
//         // })
//       ],
//   controllers: [UserController],
//   providers: [UserService],
// })
// export class UserModule {}


// // import { Module } from '@nestjs/common';
// // import { UserController } from './user.controller';
// // import { UserService } from './user.service';
// // import { User } from './user.entity';
// // import { TypeOrmModule } from '@nestjs/typeorm';


// // @Module({
// //   imports: [
// //     TypeOrmModule.forFeature([User]),
// //     JwtModule.register({
// //       global: true,
// //       secret: jwtConstants.secret,
// //       signOptions: { expiresIn: '30m' },
// //     })],
// //   controllers: [UserController],
// //   providers: [UserService],
// // })
// // export class UserModule {}

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
