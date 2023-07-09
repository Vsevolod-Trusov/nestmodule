import { Note } from 'entity';

import { GenericRepository } from './mongo-generic-repository.type';

export abstract class DataService {
  abstract notes: GenericRepository<Note>;
}
