import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Public } from 'src/auth/public.decorator';
import { Player } from './entities/player.entity';
import { AssignPlayerTeamDto } from './dto/assign-player-team.dto';
import { PlayerTeamService } from 'src/player-team/player-team.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService,
              private readonly playerTeamService: PlayerTeamService
  ) {}

  @Post()
  @Public()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.playerService.findAll();
  }

  @Post(':playerId/assign-team')
  @Public()
  async assignPlayerToTeam(
    @Param('playerId') playerId: number,
    @Body() assignPlayerTeamDto: AssignPlayerTeamDto
  ) {
    return this.playerService.assignPlayerToTeam(playerId, assignPlayerTeamDto.teamId);
  }

  // 📌 Obter histórico de times do jogador
  @Get(':playerId/history')
  @Public()
  async getPlayerHistory(@Param('playerId') playerId: number) {
    return this.playerTeamService.getPlayerHistory(playerId);
  }
  
  @Get('user/:userId')
  @Public()
  async findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Player | null> {
    return this.playerService.findByUserId(userId);
  }

  @Get('player/:nickname')
  @Public()
  async findByNickname(@Param('nickname') nickname: string): Promise<Player | null> {
    return this.playerService.findByNickname(nickname);
  }

  @Get(':id')
  
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Get('nickname/user/:userId')
  @Public()
getNicknameByUserId(@Param('userId') userId: number) {
  return this.playerService.getNicknameByUserId(+userId);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }

  @Get('search/:nickname')
  @Public()
  searchPlayers(@Param('nickname') nickname: string) {
    return this.playerService.searchPlayersByNickname(nickname);
  }
}