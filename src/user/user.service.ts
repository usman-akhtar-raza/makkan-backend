import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

// @UseGuards(AuthGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService to generate token
  ) {}

  // Method to get all users (same as your previous method)
  // getUser() {
  //   return this.userRepository.find();
  // }


  async validateUser(email: string, password: string): Promise<{ token: string; user: Partial<User> } | null> {
    const user = await this.userRepository.findOne({
      where: { Email: email },
    });
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.Password);
    // if (!isValidPassword) {
    //   return null;
    // }

    const payload = { id: user.User_ID, email: user.Email, name: user.FirstName };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        User_ID: user.User_ID,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName
      },
    };
  }

  // async validateUser(email: string, password: string): Promise<User | null> {
  //   const user = await this.userRepository.findOne({
  //     where: { Email: email },
  //   });
  //   if (!user) {
  //     return null;
  //   }
  //   // console.log(password ,user.Password,user);

  //   // const isValidPassword = await bcrypt.compare(password, user.Password);
  //   // console.log(isValidPassword);
  //   // if (!isValidPassword) {
  //   //   return null;
  //   // }

  //   return user;
  // }

  async register(
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
  ) {
    const  password = Password
    console.log(
      `Registering user: ${FirstName} ${LastName} ${Email} ${Password}`,
    );
    // const { FirstName, LastName, Email, Password } = userData;

    // console.log(userData, 'userdata is here');
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { Email },
    });
    console.log(existingUser, 'existing user is here');
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    console.log(hashedPassword, 'hashed password is here');
    // Create and save the user
    const user = this.userRepository.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: hashedPassword,
    });
    console.log(user, 'user is here');
    await this.userRepository.save(user);
    console.log(user);
    return {
      message: 'User registered successfully',
      user: { id: user.User_ID, FirstName, LastName, Email },
    };
  }
}
