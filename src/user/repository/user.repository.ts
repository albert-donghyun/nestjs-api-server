import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity';
import { Repository } from 'typeorm';
import { IAddUser } from '../interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async getOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async add(args: IAddUser) {
    return this.repository.save(this.repository.create(args));
  }
}
