import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Team } from './entities/team.entity';
import { PlayerModule } from 'src/modules/player/player.module';
import { Player } from 'src/modules/player/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, Player]), PlayerModule],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService],
})
export class TeamsModule {}
