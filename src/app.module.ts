import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { PlayerModule } from './player/player.module';
import { TeamsModule } from './teams/teams.module';
import { ChampionshipModule } from './championship/championship.module';
import { MatchModule } from './match/match.module';
import { StandingModule } from './standing/standing.module';
import { ChampionshipTeamModule } from './championship-team/championship-team.module';
import { PlayerTeamModule } from './player-team/player-team.module';
import { TeamInviteModule } from './team-invite/team-invite.module';
import { PlayoffModule } from './playoff/playoff.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
