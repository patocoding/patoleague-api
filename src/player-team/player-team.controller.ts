import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PlayerTeamService } from './player-team.service';
import { CreatePlayerTeamDto } from './dto/createPlayerTeam.dto';
import { UpdatePlayerTeamDto } from './dto/updatePlayerTeam.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('player-teams')
export class PlayerTeamController {
  constructor(private readonly playerTeamService: PlayerTeamService) {}

  @Post()
   @Public()
  create(@Body() createPlayerTeamDto: CreatePlayerTeamDto) {
    return this.playerTeamService.create(createPlayerTeamDto);
  }

  @Get()
   @Public()
  findAll() {
    return this.playerTeamService.findAll();
  }

  @Get('player/:playerId')
  @Public()
  findByPlayer(@Param('playerId') playerId: string) {
    return this.playerTeamService.findByPlayer(+playerId);
  }

  @Get('team/:teamId')
  @Public()
  findByTeam(@Param('teamId') teamId: string) {
    return this.playerTeamService.findByTeam(+teamId);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePlayerTeamDto: UpdatePlayerTeamDto) {
    return this.playerTeamService.update(+id, updatePlayerTeamDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.playerTeamService.remove(+id);
  }
}
