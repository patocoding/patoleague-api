import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PlayerMatchStatsService } from './player-match-stats.service';
import { CreatePlayerMatchStatsDto } from './dto/create-player-match-stats.dto';
import { UpdatePlayerMatchStatsDto } from './dto/update-player-match-stats.dto';

@Controller('player-stats')
export class PlayerMatchStatsController {
  constructor(private readonly statsService: PlayerMatchStatsService) {}

  @Post()
  create(@Body() dto: CreatePlayerMatchStatsDto) {
    return this.statsService.create(dto);
  }

  @Get('total/:playerId')
    getTotalStats(@Param('playerId') playerId: number) {
    return this.statsService.getTotalStatsForPlayer(playerId);
    }

  @Get()
  findAll() {
    return this.statsService.findAll();
  }

  @Get(':playerId')
  findByPlayer(@Param('playerId') playerId: number) {
    return this.statsService.findByPlayer(playerId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePlayerMatchStatsDto) {
    return this.statsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.statsService.remove(id);
  }
}
