import { Note } from 'entity';

import { IGenericRepository } from './mongo-generic-repository.type';

export abstract class IDataServices {
  abstract notes: IGenericRepository<Note>;
}
