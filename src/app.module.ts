import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LoggerMiddleware } from 'logger/logger.middleware';
import { NotesModule } from 'notes/notes.module';

@Module({
  imports: [NotesModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
