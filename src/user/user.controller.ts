import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getUser() {
  //   return this.userService.getUser();
  // }

  // Endpoint to login (authenticate the user)
  @Post('validate')
  async validateUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (!email || !password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  @Post('register')
  async register(
    @Body()
    userData: {
      FirstName: string;
      LastName: string;
      Email: string;
      Password: string;
    },
  ) {
    return await this.userService.register(
      userData.FirstName,
      userData.LastName,
      userData.Email,
      userData.Password,
    );
  }
}
