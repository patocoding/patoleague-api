import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User } from '../user/entities/user.entity';
import { Player } from 'src/player/entities/player.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdBy = await this.userRepository.findOne({ 
      where: { id: createTeamDto.createdById }, 
      relations: ['player', 'player.team'] // Carrega também o time do jogador 
    });
  
    if (!createdBy) {
      throw new NotFoundException('Usuário criador do time não encontrado');
    }
  
    if (createdBy.team || (createdBy.player && createdBy.player.team)) {
      throw new Error('Usuário já faz parte de um time.');
    }
  
    createTeamDto.foundedYear = new Date().getFullYear();
    const team = this.teamRepository.create({ ...createTeamDto, createdBy });
    const savedTeam = await this.teamRepository.save(team);
  
    // Atualiza o usuário para ser dono desse time
    createdBy.team = savedTeam;
  
    // 🔥 Se o usuário tem um jogador, adiciona o jogador ao time criado
    if (createdBy.player) {
      createdBy.player.team = savedTeam;
      await this.userRepository.save(createdBy); // Salva a atualização no usuário
      await this.playerRepository.save(createdBy.player); // Salva o time do jogador
    }
  
    return savedTeam;
  }
  
  


  async findByUserId(userId: number): Promise<Team | null> {
    return this.teamRepository.findOne({ where: { createdBy: { id: userId } }, relations: ['players', 'createdBy'] });
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['players', 'createdBy'] });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['players', 'createdBy', 'championshipTeams', 'championshipTeams.championship'],
    });
  
    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }
  
    // 🔥 Filtra apenas campeonatos ativos
    team.championshipTeams = team.championshipTeams.filter(
      (entry) => entry.championship.isActive
    );
  
    return team;
  }
  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);

    Object.assign(team, updateTeamDto);
    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
  }
}