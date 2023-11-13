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

  async findById(id: number, role?: Role): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        artist: role === Role.ARTIST,
      },
    });

    console.log(role, '===');
    return user;
  }

  async findUser(param: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.phone = :phone OR user.email = :email', {
        phone: param,
        email: param,
      })
      .getOne();

    return user;
  }

  async create(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    const findUser = await this.findUser(phone);
    if (findUser) {
      throw new BadRequestException(
        'Account already exists with this Phone number',
      );
    } else {
      const findEmail = await this.findUser(email);
      if (findEmail) {
        throw new BadRequestException('Account already exists with this email');
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

  async update(updateData: Partial<User>) {
    return await this.userRepository.save(updateData);
  }
}
