import { Module } from '@nestjs/common';
import { PlayoffService } from './playoff.service';
import { PlayoffController } from './playoff.controller';

@Module({
  providers: [PlayoffService],
  controllers: [PlayoffController]
})
export class PlayoffModule {}
