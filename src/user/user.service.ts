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
    const user = await this.userRepository.findOne({
      where: { Email: email },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.Password);
    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async register(
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string,
  ) {
    const  password = Password.toString();
    console.log(
      `Registering user: ${FirstName} ${LastName} ${Email} ${password}`,
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
      Password: password,
    });
    console.log(user, 'user is here');
    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
      user: { id: user.User_ID, FirstName, LastName, Email },
    };
  }
}
