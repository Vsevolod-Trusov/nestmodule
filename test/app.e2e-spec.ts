import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { NotesModule } from 'notes.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/greetings/:name (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/greetings/vsevolod')
      .expect(200)
      .expect('Hello vsevolod');
  });
});
