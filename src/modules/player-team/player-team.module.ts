import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTeamService } from './player-team.service';
import { PlayerTeamController } from './player-team.controller';
import { PlayerTeam } from './entities/playerTeam.entity';
import { Player } from '../player/entities/player.entity';
import { Team } from '../teams/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerTeam, Player, Team])],
  controllers: [PlayerTeamController],
  providers: [PlayerTeamService],
  exports: [PlayerTeamService, TypeOrmModule],
})
export class PlayerTeamModule {}