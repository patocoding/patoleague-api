import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Team } from './entities/team.entity';
import { PlayerModule } from 'src/player/player.module';
import { Player } from 'src/player/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, Player]), PlayerModule],
  providers: [TeamsService],
  controllers: [TeamsController],
  exports: [TeamsService], // 🔥 Agora pode ser importado por outros módulos
})
export class TeamsModule {}
