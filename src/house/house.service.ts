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

import { Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  async getHouse() {
    return await this.houseRepository.find();
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
  async updateHouse(
    House_ID: number,
    User_ID: number,
    Price: number,
    Status: string,
    Category: string,
    Location: string,
    file: any,
  ) {
    const house = await this.houseRepository.findOne({ where: { House_ID } });
    if (!house) {
      return { message: 'house not found' };
    }
    house.User_ID = User_ID;
    house.Price = Price;
    house.Status = Status;
    house.Category = Category;
    house.Location = Location;
    if (file) {
      house.Image = file.buffer;
    }
    await this.houseRepository.save(house);
    return 'update successfully';
  }

  async deleteHouse(id: number) {
    const house = this.houseRepository.findOne({ where: { House_ID: id } });
    if (!house) {
      return { message: 'house deleted' };
    }
    this.houseRepository.delete(id);
    return { message: 'house deleted' };
  }
}
