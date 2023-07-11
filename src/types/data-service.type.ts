import { Note } from 'entity';

import { GenericRepository } from './mongo-generic-repository.type';
import { UserRepository } from 'repository';

export abstract class DataService {
  abstract notes: GenericRepository<Note>;
  abstract users: UserRepository;
}
