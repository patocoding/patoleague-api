import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamInvite } from './entities/teamInvite.entity';
import { TeamInviteService } from './team-invite.service';
import { TeamInviteController } from './team-invite.controller';
import { Team } from '../teams/entities/team.entity';
import { Player } from 'src/player/entities/player.entity';
import { User } from '../user/entities/user.entity';
import { PlayerService } from 'src/player/player.service';
import { PlayerModule } from 'src/player/player.module';
import { PlayerTeamModule } from 'src/player-team/player-team.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamInvite, Team, Player, User]), PlayerModule, PlayerTeamModule],
  controllers: [TeamInviteController],
  providers: [TeamInviteService],
  exports: [TeamInviteService],
})
export class TeamInviteModule {}