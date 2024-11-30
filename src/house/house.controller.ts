// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { HouseService } from './house.service';
// import { Binary } from 'typeorm';

// @Controller('house')
// export class HouseController {
//   constructor(private readonly houseServise: HouseService) {}
//   @Get()
//   getHouse() {
//     return this.houseServise.getHouse();
//   }

//   @Post()
//   addHouse(
//     // @Body('House_ID')House_ID: number,
//     @Body('User_ID')User_ID: number,
//     @Body('Price')Price: number,
//     @Body('Status')Status: string,
//     @Body('Category')Category: string,
//     @Body('Location')Location:string,
//     @Body('Image') Image:Binary
//   ) {
//     this.houseServise.addHouse(
//     //   House_ID,
//       User_ID,
//       Price,
//       Status,
//       Category,
//       Location,
//       Image
//     );

//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
@Controller('house')
export class HouseController {
  constructor(private readonly houseServise: HouseService) {}

  @Get()
  getHouse() {
    return this.houseServise.getHouse();
  }

  @Post()
  @UseInterceptors(FileInterceptor('Image'))
  async addHouse(
    @Body('House_ID') House_ID: number,
    @Body('User_ID') User_ID: number,
    @Body('Price') Price: number,
    @Body('Status') Status: string,
    @Body('Category') Category: string,
    @Body('Location') Location: string,
    @UploadedFile() file: multer.File,
  ) {
    const imageBuffer = file.buffer; // Image as binary data
    await this.houseServise.addHouse(
      House_ID,
      User_ID,
      Price,
      Status,
      Category,
      Location,
      imageBuffer,
    );
    return { message: 'House added successfully' };
  }
  @Put(':id')
  updateHouse(
    @Param('id') House_ID: number,
    @Body() houseData: {
      User_ID: number;
      Price: number;
      Status: string;
      Category: string;
      Location: string;
    },
    @UploadedFile() Image: multer.File,
  ) {
    return this.houseServise.updateHouse(
      House_ID,
      houseData.User_ID,
      houseData.Price,
      houseData.Status,
      houseData.Category,
      houseData.Location,
      Image,
    );
  }

  @Delete(':id')
  deleteHouse(@Param('id') id: number) {
    return this.houseServise.deleteHouse(id);
  }
}
