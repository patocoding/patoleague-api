import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Championship } from 'src/championship/entities/championship.entity';
import { Team } from '../teams/entities/team.entity';
import { Standing } from 'src/standing/entities/standing.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Championship)
    private readonly championshipRepository: Repository<Championship>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Standing)
    private readonly standingRepository: Repository<Standing>,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const championship = await this.championshipRepository.findOne({ where: { id: createMatchDto.championshipId } });
    if (!championship) throw new NotFoundException('Campeonato não encontrado');
  
    const team1 = await this.teamRepository.findOne({ where: { id: createMatchDto.team1Id } });
    const team2 = await this.teamRepository.findOne({ where: { id: createMatchDto.team2Id } });
    if (!team1 || !team2) throw new NotFoundException('Um ou ambos os times não foram encontrados');
  
    const isTeam1Home = Math.random() < 0.5;
    const homeTeam = isTeam1Home ? team1 : team2;
    const awayTeam = isTeam1Home ? team2 : team1;
  
    const match = this.matchRepository.create({
      championship,
      teamHome: homeTeam,
      teamAway: awayTeam,
      date: createMatchDto.date,
      status: 'Agendado',
    });
  
    return this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['championship', 'teamHome', 'teamAway'] });
  }

  async findOne(id: number): Promise<Match> {
    return await this.matchRepository.findOne({
      where: { id },
      relations: ['championship', 'teamHome', 'teamAway'],
    });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.findOne(id);
    Object.assign(match, updateMatchDto);
    return this.matchRepository.save(match);
  }

  async remove(id: number): Promise<void> {
    const match = await this.findOne(id);
    await this.matchRepository.remove(match);
  }

  async updateMatchResult(matchId: number, homeScore: number, awayScore: number): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id: matchId }, relations: ['championship', 'teamHome', 'teamAway'] });
    if (!match) throw new NotFoundException('Partida não encontrada');
  
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    match.status = 'Finalizado';
    await this.matchRepository.save(match);
  
    // Atualizar Standing dos times
    await this.updateStandingAfterMatch(match);
  
    return match;
  }
  
  async updateStandingAfterMatch(match: Match) {
    const homeStanding = await this.standingRepository.findOne({
      where: { championship: { id: match.championship.id }, team: { id: match.teamHome.id } },
    });
  
    const awayStanding = await this.standingRepository.findOne({
      where: { championship: { id: match.championship.id }, team: { id: match.teamAway.id } },
    });
  
    if (!homeStanding || !awayStanding) return;
  
    homeStanding.matchesPlayed++;
    awayStanding.matchesPlayed++;
  
    homeStanding.pointsFor += match.homeScore;
    homeStanding.pointsAgainst += match.awayScore;
    homeStanding.pointsDifference = homeStanding.pointsFor - homeStanding.pointsAgainst;
  
    awayStanding.pointsFor += match.awayScore;
    awayStanding.pointsAgainst += match.homeScore;
    awayStanding.pointsDifference = awayStanding.pointsFor - awayStanding.pointsAgainst;
  
    if (match.homeScore > match.awayScore) {
      homeStanding.wins++;
      homeStanding.points += 2; // Exemplo: vitória vale 2 pontos
      awayStanding.losses++;
    } else if (match.homeScore < match.awayScore) {
      awayStanding.wins++;
      awayStanding.points += 2;
      homeStanding.losses++;
    }
  
    await this.standingRepository.save([homeStanding, awayStanding]);
  }
}