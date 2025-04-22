import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/modules/teams/entities/team.entity';
import { User } from '../user/entities/user.entity';
import { Player } from './entities/player.entity';
import { PlayerTeamModule } from 'src/modules/player-team/player-team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, User, Team]),
    PlayerTeamModule
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
