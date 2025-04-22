import { Championship } from 'src/modules/championship/entities/championship.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChampionshipTeam } from './entities/championshipTeam.entity';
import { CreateChampionshipTeamDto } from './dto/create-championship-team.dto';
import { Team } from '../teams/entities/team.entity';
import { StandingService } from 'src/modules/standing/standing.service';

@Injectable()
export class ChampionshipTeamsService {
  constructor(
    @InjectRepository(ChampionshipTeam)
    private readonly championshipTeamRepository: Repository<ChampionshipTeam>,

    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    private readonly standingService: StandingService
  ) {}

  async addTeamToChampionship(dto: CreateChampionshipTeamDto): Promise<ChampionshipTeam> {
    const championship = await this.championshipRepository.findOne({ where: { id: dto.championshipId } });
    if (!championship) throw new NotFoundException('Campeonato não encontrado');
  
    const team = await this.teamRepository.findOne({ where: { id: dto.teamId } });
    if (!team) throw new NotFoundException('Time não encontrado');
  
    const championshipTeam = this.championshipTeamRepository.create({ championship, team });
    await this.championshipTeamRepository.save(championshipTeam);
  
   
    await this.standingService.createStanding(dto.championshipId, dto.teamId);
  
    return championshipTeam;
  }

  async getTeamsByChampionship(championshipId: number): Promise<Team[]> {
    const championship = await this.championshipRepository.findOne({ where: { id: championshipId } });
    if (!championship) throw new NotFoundException('Campeonato não encontrado');
  
    const championshipTeams = await this.championshipTeamRepository.find({
      where: { championship: { id: championshipId } },
      relations: ['team'],
    });
  
    return championshipTeams.map(ct => ct.team);
  }

  async removeTeamFromChampionship(id: number): Promise<void> {
    const championshipTeam = await this.championshipTeamRepository.findOne({ where: { id } });
    if (!championshipTeam) throw new NotFoundException('Associação entre campeonato e time não encontrada');
    
    await this.championshipTeamRepository.remove(championshipTeam);
  }
}