import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { GenericRepository } from 'types';

@Injectable()
export class MongoGenericRepository<T> implements GenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find();
  }

  async findAllUsingPagination(page, limit): Promise<T[]> {
    if (page && limit) {
      const skip = (page - 1) * limit;

      return await this._repository.find().limit(limit).skip(skip);
    }
  }

  async findByFilter(filter: object ): Promise<T[]> {
    return await this._repository.find(filter)
  }

  async findByFilterUsingPagination(
    filter: object,
    page: number,
    limit: number,
  ): Promise<T[]> {
    const skip = (page - 1) * limit;

    return await this._repository.find(filter).limit(limit).skip(skip);
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
