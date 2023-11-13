import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/constants';

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
}
