import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionshipTeam } from './entities/championshipTeam.entity';
import { ChampionshipTeamsService } from './championship-team.service';
import { ChampionshipTeamsController } from './championship-team.controller';
import { Championship } from 'src/modules/championship/entities/championship.entity';
import { Team } from '../teams/entities/team.entity';
import { StandingService } from 'src/modules/standing/standing.service';
import { StandingModule } from 'src/modules/standing/standing.module';
import { ChampionshipModule } from 'src/modules/championship/championship.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChampionshipTeam, Championship, Team]), // ✅ Inclui Championship
    ChampionshipModule, // ✅ Importa ChampionshipModule
    StandingModule, // ✅ Importa Standings para ser utilizado no serviço
  ],
  controllers: [ChampionshipTeamsController],
  providers: [ChampionshipTeamsService, StandingService],
  exports: [ChampionshipTeamsService],
})
export class ChampionshipTeamModule {}
