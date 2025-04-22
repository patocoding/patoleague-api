import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { StandingService } from './standing.service';
import { StandingController } from './standing.controller';
import { Championship } from 'src/modules/championship/entities/championship.entity';
import { Team } from '../teams/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Standing, Championship, Team])],
  controllers: [StandingController],
  providers: [StandingService],
  exports: [StandingService, TypeOrmModule],
})
export class StandingModule {}