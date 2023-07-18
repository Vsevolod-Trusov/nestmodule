import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from 'entity';
import { MongoGenericRepository } from 'repository';

@Injectable()
export class UserRepository extends MongoGenericRepository<User> {
  constructor(userRepository: Model<User>) {
    super(userRepository);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneByFilter({ email: email });
  }

  async findOneById(id: string): Promise<User> {
    return await this.findOneByFilter({ id: id });
  }

  async updateById(
    id: string,
    userToUpdate,
  ): Promise<User | NotFoundException> {
    return await this.update({ id: id }, userToUpdate);
  }

  async replaceByEmail(
    email: string,
    userToReplace,
  ): Promise<User | NotFoundException> {
    return await this.replaceOneByFilter({ email: email }, userToReplace);
  }

  async updateByEmail(
    email: string,
    userToUpdate,
  ): Promise<User | NotFoundException> {
    return await this.update({ email: email }, userToUpdate);
  }
}
