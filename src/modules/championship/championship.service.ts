import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Championship } from './entities/championship.entity';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship-dto';
import { ChampionshipTeam } from 'src/modules/championship-team/entities/championshipTeam.entity';
import { Match } from 'src/modules/match/entities/match.entity';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,

    @InjectRepository(ChampionshipTeam)
    private readonly championshipTeamRepository: Repository<ChampionshipTeam>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(createChampionshipDto: CreateChampionshipDto): Promise<Championship> {
    const championship = this.championshipRepository.create(createChampionshipDto);
    return this.championshipRepository.save(championship);
  }

  async findAll(): Promise<Championship[]> {
    return this.championshipRepository.find({ relations: ['matches'] });
  }

  async findOne(id: number): Promise<Championship> {
    const championship = await this.championshipRepository.findOne({
      where: { id },
      relations: ['matches'],
    });
    if (!championship) throw new NotFoundException('Campeonato não encontrado');
    return championship;
  }

  async update(id: number, updateChampionshipDto: UpdateChampionshipDto): Promise<Championship> {
    const championship = await this.findOne(id);
    Object.assign(championship, updateChampionshipDto);
    return this.championshipRepository.save(championship);
  }

  async remove(id: number): Promise<void> {
    const championship = await this.findOne(id);
    await this.championshipRepository.remove(championship);
  }
}