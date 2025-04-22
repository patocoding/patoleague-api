import { Module } from '@nestjs/common';
import { PlayerWeekService } from './player-week.service';

@Module({
  providers: [PlayerWeekService]
})
export class PlayerWeekModule {}
