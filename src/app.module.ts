import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ALL_ROUTES, MIDDLEWARE_ROUTE } from 'common';
import { MongoDataServiceModule } from 'data-service';
import {
  LoggerMiddleware,
  DatabaseConnectionCheckMiddleware,
} from 'middleware';
import { NotesModule } from 'notes/notes.module';

@Module({
  imports: [NotesModule, MongoDataServiceModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ALL_ROUTES);
    consumer
      .apply(DatabaseConnectionCheckMiddleware)
      .forRoutes(MIDDLEWARE_ROUTE);
  }
}
