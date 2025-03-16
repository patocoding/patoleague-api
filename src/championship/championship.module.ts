import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Championship } from './entities/championship.entity';
import { ChampionshipService } from './championship.service';
import { ChampionshipController } from './championship.controller';
import { ChampionshipTeam } from 'src/championship-team/entities/championshipTeam.entity';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Championship, ChampionshipTeam, Match])],
  controllers: [ChampionshipController],
  providers: [ChampionshipService],
  exports: [ChampionshipService, TypeOrmModule],
})
export class ChampionshipModule {}