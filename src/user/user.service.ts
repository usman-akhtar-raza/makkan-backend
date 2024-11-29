import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';






 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private jwtService: JwtService, // Inject JwtService to generate token
  ) {}

  // Method to get all users (same as your previous method)
  // getUser() {
  //   return this.userRepository.find();
  // }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = this.userRepository.findOne({where:{Email: email, Password: password}});
    return user || null;
  }
  
  async register(userData: { FirstName: string; LastName: string; Email: string; Password: string }) {
    const { FirstName, LastName, Email, Password } = userData;

    
    
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { Email } });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create and save the user
    const user = this.userRepository.create({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      user: { id: user.User_ID, FirstName, LastName, Email },
    };
  }



  }