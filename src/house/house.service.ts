// import { House } from './house.entity';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Binary, Repository } from 'typeorm';

// @Injectable()
// export class HouseService {
//   constructor(
//     @InjectRepository(House) private houseRepository: Repository<House>,
//   ) {}
//   getHouse() {
//     return this.houseRepository.find();
//   }
//   addHouse(
//     // House_ID: number,
//     User_ID: number,
//     Price: number,
//     Status: string,
//     Category: string,
//     Location: string,
//     Image: Binary
//   ) {
//     const house = this.houseRepository.create({
//     //   House_ID: House_ID,
//       User_ID: User_ID,
//       Price: Price,
//       Status: Status,
//       Category: Category,
//       Location: Location,
//       Image: Image
//     });
//     this.houseRepository.save(house);
//     return 'House added successfully';
//   }
// }

import { Body, Injectable, Param, Put, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  // async getHouse() {
  //   return await this.houseRepository.find();
    
  // }

  async getHouse() {
    const houses = await this.houseRepository.find();
    // Convert BLOB to Base64
    return houses.map(house => ({
      ...house,
      Image: house.Image
        ? Buffer.from(house.Image).toString('base64')
        : null, // Convert only if Image exists
    }));
  }
  async addHouse(
    House_ID: number,
    User_ID: number,
    Price: number,
    Status: string,
    Category: string,
    Location: string,
    Image: Buffer,
  ) {
    const house = this.houseRepository.create({
      House_ID,
      User_ID,
      Price,
      Status,
      Category,
      Location,
      Image,
    });
    await this.houseRepository.save(house);
    return house;
  }
  // async updateHouse(
  //   House_ID: number,
  //   User_ID: number,
  //   Price: number,
  //   Status: string,
  //   Category: string,
  //   Location: string,
  //   file: any,
  // ) {
  //   const house = await this.houseRepository.findOne({ where: { House_ID } });
  //   if (!house) {
  //     return { message: 'house not found' };
  //   }
  //   house.User_ID = User_ID;
  //   house.Price = Price;
  //   house.Status = Status;
  //   house.Category = Category;
  //   house.Location = Location;
  //   if (file) {
  //     house.Image = file.buffer;
  //   }
  //   await this.houseRepository.save(house);
  //   return 'update successfully';
  // }

  async updateHouse(
    House_ID: number,
    User_ID: number,
    Price: number,
    Status: string,
    Category: string,
    Location: string,
    file: any,
  ) {
    try {
      console.log(`Updating house with ID ${House_ID}`);
      const house = await this.houseRepository.findOne({
        where: { House_ID },
      });
      console.log(house, 'house is here');
      if (!house) {
        console.log(`House not found with ID ${House_ID}`);
        return { message: 'house not found' };
      }
      console.log(`Updating house properties`);
      house.User_ID = User_ID;
      house.Price = Price;
      house.Status = Status;
      house.Category = Category;
      house.Location = Location;
      if (file) {
        house.Image = file.buffer;
      }
      console.log(`Saving updated house`);
      console.log(house, 'updated house is here');
      await this.houseRepository.update(House_ID, house);
      console.log(`House updated successfully`);
      return 'update successfully';
    } catch (error) {
      console.error(`Error updating house: ${error.message}`);
      return { message: 'error updating house' };
    }
  }

  // async updateHouse(
  //   House_ID: number,
  //   User_ID: number,
  //   Price: number,
  //   Status: string,
  //   Category: string,
  //   Location: string,
  //   Image: any,
  // ) {
  //   const house = await this.houseRepository.findOne({ where: { House_ID } });
  //   console.log(house, 'jo data ia ha ');
  //   if (!house) {
  //     return { message: 'House not found' };
  //   }

  //   console.log(
  //     User_ID,
  //     Price,
  //     Status,
  //     Category,
  //     Location,
  //     Image,
  //     'jo data new send kar raha hu',
  //   );
  //   await this.houseRepository
  //   .createQueryBuilder('house')
  //   .update()
  //   .set({
  //     User_ID,
  //     Price,
  //     Status,
  //     Category,
  //     Location,
  //     Image,
  //   })
  //   .where('House_ID = :House_ID', { House_ID })
  //   .execute();

  //   return 'updated data';
  // }

  async deleteHouse(id: number) {
    const house = this.houseRepository.findOne({ where: { House_ID: id } });
    if (!house) {
      return { message: 'house deleted' };
    }
    this.houseRepository.delete(id);
    return { message: 'house deleted' };
  }
}
