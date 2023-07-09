import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IGenericRepository } from 'types';

@Injectable()
export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find();
  }

  async findOneByParameters(object: object): Promise<T> {
    return await this._repository.findOne(object).exec();
  }

  async findByParameters(object: object): Promise<T[]> {
    return await this._repository.find(object);
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }

  async update(filter: object, item: T): Promise<T> {
    return await this._repository.findOneAndUpdate(filter, item, { new: true });
  }

  async deleteOne(filter: object) {
    return await this._repository.deleteOne(filter);
  }
}
