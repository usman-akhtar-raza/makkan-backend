import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyerService } from './buyer.service';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly BuyerService: BuyerService) {}
  @Get()
  getBuyer() {
    return this.BuyerService.getBuyer();
  }
  @Post()
  async addBuyer(
    @Body() body: { buyer_ID: number; User_ID: number; Created_at: string },
  ) {
    return await this.BuyerService.addBuyer(body);
  }

  @Put(':Buyer_ID')
  async updateBuyer(
    @Param('Buyer_ID') Buyer_ID: number,
    @Body() body: {  User_ID: number; Created_at: string },
  ) {
  
    return this.BuyerService.UpdateBuyer(Buyer_ID,body);
  }
 @Delete(':Buyer_ID')
  async deleteBuyer(@Param('Buyer_ID') Buyer_ID: number) {
    return this.BuyerService.deleteBuyer(Buyer_ID);
  }

}
