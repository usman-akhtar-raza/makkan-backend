import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
  ) {}
  async getBuyer() {
    return await this.buyerRepository.find();
  }
  async addBuyer(body: { User_ID: number; Created_at: string }) {
    return await this.buyerRepository.save(body);
  }
  async UpdateBuyer( Buyer_ID: number, body: { User_ID: number; Created_at: string }) {
    const newbuyer = await this.buyerRepository.findOne({
      where: { Buyer_ID },
    });
    console.log(newbuyer);
    //   return await this.buyerRepository.update(newbuyer.Buyer_ID,body);
    return 'updaetd';
  }

  async deleteBuyer(Buyer_ID:number){
    await this.buyerRepository.delete(Buyer_ID);
    return "deleted successfully"
  }
}
