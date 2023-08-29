import { NoteRepository, UserRepository } from 'repository';

export abstract class DataService {
  abstract notes: NoteRepository;
  abstract users: UserRepository;
}
