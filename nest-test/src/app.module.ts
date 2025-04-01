import { Module } from '@nestjs/common';
import { CatsController } from './controller/cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
