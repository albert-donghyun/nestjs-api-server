import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { IAddUser } from './interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }

  async addUser(args: IAddUser) {
    return this.userRepository.add(args);
  }
}
