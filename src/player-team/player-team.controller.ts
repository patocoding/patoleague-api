import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PlayerTeamService } from './player-team.service';
import { CreatePlayerTeamDto } from './dto/createPlayerTeam.dto';
import { UpdatePlayerTeamDto } from './dto/updatePlayerTeam.dto';

@Controller('player-teams')
export class PlayerTeamController {
  constructor(private readonly playerTeamService: PlayerTeamService) {}

  @Post()
  create(@Body() createPlayerTeamDto: CreatePlayerTeamDto) {
    return this.playerTeamService.create(createPlayerTeamDto);
  }

  @Get()
  findAll() {
    return this.playerTeamService.findAll();
  }

  @Get('player/:playerId')
  findByPlayer(@Param('playerId') playerId: string) {
    return this.playerTeamService.findByPlayer(+playerId);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string) {
    return this.playerTeamService.findByTeam(+teamId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerTeamDto: UpdatePlayerTeamDto) {
    return this.playerTeamService.update(+id, updatePlayerTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerTeamService.remove(+id);
  }
}
