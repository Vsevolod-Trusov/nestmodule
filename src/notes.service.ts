import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloWithName(name: string): string {
    return `<h4>Hello ${name}</h4>`;
  }
}
