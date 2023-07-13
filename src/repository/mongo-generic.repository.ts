import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';

import { GenericRepository } from 'types';
import { getSkipValue } from 'utils';

@Injectable()
export class MongoGenericRepository<T> extends GenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    super();
    this._repository = repository;
  }

  protected async findOneByFilter(filter: FilterQuery<T>): Promise<T> {
    return await this._repository.findOne(filter);
  }

  async findByFilterUsingPagination(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
  ): Promise<T[]> {
    const skip = getSkipValue(page, limit);

    return await this._repository.find(filter).limit(limit).skip(skip);
  }

  async countItems(): Promise<number> {
    return await this._repository.countDocuments();
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }

  async update(filter: FilterQuery<T>, item: T): Promise<T> {
    return await this._repository.findOneAndUpdate(filter, item, { new: true });
  }

  async deleteOne(filter: object) {
    return await this._repository.deleteOne(filter);
  }
}
