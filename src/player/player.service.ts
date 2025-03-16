import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { User } from '../user/entities/user.entity';
import { Team } from '../teams/entities/team.entity';
import { PlayerTeam } from 'src/player-team/entities/playerTeam.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(PlayerTeam)
    private readonly playerTeamRepository: Repository<PlayerTeam>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const user = await this.userRepository.findOne({ where: { id: createPlayerDto.userId } });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  
    const player = this.playerRepository.create({
      ...createPlayerDto,
      user,
      team: user.team || null,
    });
  
    return this.playerRepository.save(player);
  }

  async getNicknameByUserId(userId: number): Promise<{ nickname: string }> {
    const player = await this.playerRepository.findOne({
      where: { user: { id: userId } },
    });
  
    if (!player || !player.nickname) {
      throw new NotFoundException('Jogador não encontrado ou sem nickname');
    }
  
    return { nickname: player.nickname };
  }

  async searchPlayersByNickname(nickname: string): Promise<Player[]> {
    return this.playerRepository.find({
      where: { nickname: Like(`%${nickname}%`) }, // Faz a busca parcial pelo nickname
      take: 5, // Limita os resultados para evitar sobrecarga
    });
  }

  async findByNickname(nickname: string): Promise<Player | null> {
    return this.playerRepository.findOne({ 
      where: { nickname },
      relations: ['user', 'team']
    });
  }
  
  async findByUserId(userId: number): Promise<Player | null> {
    return this.playerRepository.findOne({ 
      where: { user: { id: userId } }, 
      relations: ['user', 'team']
    });
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['user', 'team'] });
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id }, relations: ['user', 'team'] });

    if (!player) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return player;
  }

  async assignPlayerToTeam(playerId: number, teamId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id: playerId }, relations: ['team'] });
    if (!player) throw new NotFoundException('Jogador não encontrado.');
  
    const newTeam = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!newTeam) throw new NotFoundException('Time não encontrado.');
  
    // Se o jogador já tiver um time, fechar o registro anterior na `player_team`
    if (player.team) {
      const lastPlayerTeam = await this.playerTeamRepository.findOne({
        where: { player: { id: player.id }, team: { id: player.team.id }, leftAt: null },
      });
  
      if (lastPlayerTeam) {
        lastPlayerTeam.leftAt = new Date();
        await this.playerTeamRepository.save(lastPlayerTeam);
      }
    }
  
    // Criar um novo registro na `player_team`
    const newPlayerTeam = this.playerTeamRepository.create({
      player,
      team: newTeam,
      joinedAt: new Date(),
      leftAt: null,
    });
  
    await this.playerTeamRepository.save(newPlayerTeam);
  
    // Atualizar o time atual do jogador
    player.team = newTeam;
    return this.playerRepository.save(player);
  }
  

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);

    Object.assign(player, updatePlayerDto);
    return this.playerRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    await this.playerRepository.remove(player);
  }
}