import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { PlayerModule } from './modules/player/player.module';
import { TeamsModule } from './modules/teams/teams.module';
import { ChampionshipModule } from './modules/championship/championship.module';
import { MatchModule } from './modules/match/match.module';
import { StandingModule } from './modules/standing/standing.module';
import { ChampionshipTeamModule } from './modules/championship-team/championship-team.module';
import { PlayerTeamModule } from './modules/player-team/player-team.module';
import { TeamInviteModule } from './modules/team-invite/team-invite.module';
import { PlayoffModule } from './modules/playoff/playoff.module';
import { PlayerMatchStatsModule } from './modules/player-match-stats/player-match-stats.module';
import { typeOrmConfig } from './config/ormconfig';
import { PlayerWeekModule } from './modules/player-week/player-week.module';
import { PlayerWeekController } from './modules/player-week/player-week.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    PlayerModule,
    TeamsModule,
    ChampionshipModule,
    MatchModule,
    StandingModule,
    ChampionshipTeamModule,
    PlayerTeamModule,
    TeamInviteModule,
    PlayoffModule,
    PlayerMatchStatsModule,
    PlayerWeekModule,
  ],
  controllers: [AppController, PlayerWeekController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
