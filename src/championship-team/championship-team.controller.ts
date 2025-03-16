import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { ChampionshipTeamsService } from './championship-team.service';
import { CreateChampionshipTeamDto } from './dto/create-championship-team.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('championship-teams')

export class ChampionshipTeamsController {
  constructor(private readonly championshipTeamsService: ChampionshipTeamsService) {}

  @Post()
  @Public()
  addTeam(@Body() dto: CreateChampionshipTeamDto) {
    return this.championshipTeamsService.addTeamToChampionship(dto);
  }

  @Delete(':id')
  @Public()
  removeTeam(@Param('id') id: number) {
    return this.championshipTeamsService.removeTeamFromChampionship(+id);
  }

  @Get(':championshipId')
  @Public()
  getTeamsByChampionship(@Param('championshipId') championshipId: number) {
    return this.championshipTeamsService.getTeamsByChampionship(+championshipId);
  }
}