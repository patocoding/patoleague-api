import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Championship } from 'src/championship/entities/championship.entity';
import { Team } from '../teams/entities/team.entity';
import { Standing } from 'src/standing/entities/standing.entity';
import { StandingModule } from 'src/standing/standing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Championship, Team, Standing]), // ✅ Inclua Standing no TypeORM
    StandingModule, // ✅ Adicione o módulo de Standings
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
