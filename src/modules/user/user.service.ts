import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number, role: Role): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        artist: role === Role.ARTIST,
      },
    });
  }

  async findUser(phoneEmail: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        phone: phoneEmail,
        email: phoneEmail,
      },
    });
  }

  async create(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    const findUser = await this.findUser(phone);
    if (findUser) {
      throw new BadRequestException();
    } else {
      const findEmail = await this.findUser(email);
      if (findEmail) {
        throw new BadRequestException();
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
        phone,
      });
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while trying to create account. please try again later',
      );
    }
  }
}
