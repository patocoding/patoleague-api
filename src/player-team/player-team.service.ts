import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerTeam } from './entities/playerTeam.entity';
import { CreatePlayerTeamDto } from './dto/createPlayerTeam.dto';
import { UpdatePlayerTeamDto } from './dto/updatePlayerTeam.dto';
import { Player } from '../player/entities/player.entity';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class PlayerTeamService {
  constructor(
    @InjectRepository(PlayerTeam)
    private readonly playerTeamRepository: Repository<PlayerTeam>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createPlayerTeamDto: CreatePlayerTeamDto): Promise<PlayerTeam> {
    const player = await this.playerRepository.findOne({
      where: { id: createPlayerTeamDto.playerId },
    });

    if (!player) throw new NotFoundException('Jogador não encontrado.');

    const team = await this.teamRepository.findOne({
      where: { id: createPlayerTeamDto.teamId },
    });

    if (!team) throw new NotFoundException('Time não encontrado.');

    const playerTeam = this.playerTeamRepository.create({
      player,
      team,
      joinedAt: createPlayerTeamDto.joinedAt,
      leftAt: createPlayerTeamDto.leftAt || null,
    });

    return this.playerTeamRepository.save(playerTeam);
  }

  async findAll(): Promise<PlayerTeam[]> {
    return this.playerTeamRepository.find({ relations: ['player', 'team'] });
  }

  async getPlayerHistory(playerId: number): Promise<PlayerTeam[]> {
    return this.playerTeamRepository.find({
      where: { player: { id: playerId } },
      relations: ['team'],
      order: { joinedAt: 'DESC' },
    });
  }
  

  async findByPlayer(playerId: number): Promise<PlayerTeam[]> {
    return this.playerTeamRepository.find({
      where: { player: { id: playerId } },
      relations: ['team'],
    });
  }

  async findByTeam(teamId: number): Promise<PlayerTeam[]> {
    return this.playerTeamRepository.find({
      where: { team: { id: teamId } },
      relations: ['player'],
    });
  }

  async update(id: number, updatePlayerTeamDto: UpdatePlayerTeamDto): Promise<PlayerTeam> {
    const playerTeam = await this.playerTeamRepository.findOne({ where: { id } });

    if (!playerTeam) throw new NotFoundException('Registro de jogador/time não encontrado.');

    Object.assign(playerTeam, updatePlayerTeamDto);
    return this.playerTeamRepository.save(playerTeam);
  }

  async remove(id: number): Promise<void> {
    const playerTeam = await this.playerTeamRepository.findOne({ where: { id } });

    if (!playerTeam) throw new NotFoundException('Registro de jogador/time não encontrado.');

    await this.playerTeamRepository.remove(playerTeam);
  }
}
