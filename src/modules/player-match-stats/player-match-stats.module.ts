import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerMatchStats } from './entities/player-match-stats.entity';
import { PlayerMatchStatsService } from './player-match-stats.service';
import { PlayerMatchStatsController } from './player-match-stats.controller';
import { Player } from 'src/modules/player/entities/player.entity';
import { Match } from 'src/modules/match/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerMatchStats, Player, Match])],
  controllers: [PlayerMatchStatsController],
  providers: [PlayerMatchStatsService],
})
export class PlayerMatchStatsModule {}
