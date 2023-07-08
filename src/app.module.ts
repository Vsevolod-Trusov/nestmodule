import { MiddlewareConsumer, Module } from '@nestjs/common';

import { MongoDataServiceModule } from 'data-service';
import { LoggerMiddleware } from 'logger/logger.middleware';
import { NotesModule } from 'notes/notes.module';

@Module({
  imports: [NotesModule, MongoDataServiceModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
