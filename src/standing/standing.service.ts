import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standing } from './entities/standing.entity';
import { Championship } from 'src/championship/entities/championship.entity';
import { Team } from '../teams/entities/team.entity';
import { UpdateStandingDto } from './dto/update-standing.dto';

@Injectable()
export class StandingService {
  constructor(
    @InjectRepository(Standing)
    private readonly standingRepository: Repository<Standing>,

    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<Standing[]> {
    return this.standingRepository.find({
      relations: ['championship', 'team'],
      order: {
        points: 'DESC',
        pointsDifference: 'DESC',
      },
    });
  }

  async createStanding(championshipId: number, teamId: number): Promise<Standing> {
    const championship = await this.championshipRepository.findOne({ where: { id: championshipId } });
    if (!championship) throw new NotFoundException('Campeonato não encontrado');
  
    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Time não encontrado');
  
    const existingStanding = await this.standingRepository.findOne({
      where: { championship: { id: championshipId }, team: { id: teamId } },
    });
  
    if (existingStanding) {
      throw new Error('Este time já está na classificação do campeonato');
    }
  
    const standing = this.standingRepository.create({
      championship,
      team,
      points: 0,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointsDifference: 0,
    });
  
    return this.standingRepository.save(standing);
  }
  

  async findByChampionship(championshipId: number): Promise<Standing[]> {
    return this.standingRepository.find({
      where: { championship: { id: championshipId } },
      relations: ['championship', 'team'],
      order: { points: 'DESC', pointsDifference: 'DESC' },
    });
  }

  async update(id: number, updateStandingDto: UpdateStandingDto): Promise<Standing> {
    const standing = await this.standingRepository.findOne({ where: { id } });
    if (!standing) throw new NotFoundException('Registro de classificação não encontrado');
    Object.assign(standing, updateStandingDto);
    return this.standingRepository.save(standing);
  }
}