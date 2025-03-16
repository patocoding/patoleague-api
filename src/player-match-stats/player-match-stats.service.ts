import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerMatchStats } from './entities/player-match-stats.entity';
import { CreatePlayerMatchStatsDto } from './dto/create-player-match-stats.dto';
import { UpdatePlayerMatchStatsDto } from './dto/update-player-match-stats.dto';
import { Player } from 'src/player/entities/player.entity';
import { Match } from 'src/match/entities/match.entity';

@Injectable()
export class PlayerMatchStatsService {
  constructor(
    @InjectRepository(PlayerMatchStats)
    private statsRepository: Repository<PlayerMatchStats>,

    @InjectRepository(Player)
    private playerRepository: Repository<Player>,

    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async create(dto: CreatePlayerMatchStatsDto): Promise<PlayerMatchStats> {
    const player = await this.playerRepository.findOne({ where: { id: dto.playerId } });
    if (!player) throw new NotFoundException('Jogador não encontrado.');

    const match = await this.matchRepository.findOne({ where: { id: dto.matchId } });
    if (!match) throw new NotFoundException('Partida não encontrada.');

    const stats = this.statsRepository.create({
        player, // Associa o jogador
        match, // Associa a partida
        fgm: dto.fgm,
        fga: dto.fga,
        fgPercent: dto.fga > 0 ? parseFloat(((dto.fgm / dto.fga) * 100).toFixed(1)) : 0,
        threePm: dto.threePm,
        threePa: dto.threePa,
        threePPercent: dto.threePa > 0 ? parseFloat(((dto.threePm / dto.threePa) * 100).toFixed(1)) : 0,
        ftm: dto.ftm,
        fta: dto.fta,
        ftPercent: dto.fta > 0 ? parseFloat(((dto.ftm / dto.fta) * 100).toFixed(1)) : 0,
        oreb: dto.oreb,
        dreb: dto.dreb,
        treb: dto.treb,
        ast: dto.ast,
        stl: dto.stl,
        blk: dto.blk,
    });

    return await this.statsRepository.save(stats); // 🔥 Garantindo que apenas um objeto seja salvo
}



  async getTotalStatsForPlayer(playerId: number) {
    const stats = await this.statsRepository.find({
      where: { player: { id: playerId } },
    });
  
    if (!stats.length) {
      throw new NotFoundException('Nenhuma estatística encontrada para este jogador.');
    }
  
    const totalStats = stats.reduce(
      (acc, stat) => {
        acc.fgm += stat.fgm;
        acc.fga += stat.fga;
        acc.threePm += stat.threePm;
        acc.threePa += stat.threePa;
        acc.ftm += stat.ftm;
        acc.fta += stat.fta;
        acc.oreb += stat.oreb;
        acc.dreb += stat.dreb;
        acc.treb += stat.oreb + stat.dreb;
        acc.ast += stat.ast;
        acc.stl += stat.stl;
        acc.blk += stat.blk;
        acc.points += (stat.fgm * 2) + (stat.threePm * 3) + stat.ftm; // ✅ Adicionado cálculo de pontos
        acc.gamesPlayed += 1;
        return acc;
      },
      {
        fgm: 0, fga: 0, threePm: 0, threePa: 0, ftm: 0, fta: 0, 
        oreb: 0, dreb: 0, treb: 0, ast: 0, stl: 0, blk: 0, 
        points: 0, gamesPlayed: 0, fgPercent: 0, threePPercent: 0, ftPercent: 0, 
        ppg: 0, apg: 0, rpg: 0 // ✅ Adicionado
      }
    );
  
    // Percentuais
    totalStats.fgPercent = totalStats.fga > 0 ? (totalStats.fgm / totalStats.fga) * 100 : 0;
    totalStats.threePPercent = totalStats.threePa > 0 ? (totalStats.threePm / totalStats.threePa) * 100 : 0;
    totalStats.ftPercent = totalStats.fta > 0 ? (totalStats.ftm / totalStats.fta) * 100 : 0;
  
    // Médias por jogo
    totalStats.ppg = totalStats.gamesPlayed > 0 ? parseFloat((totalStats.points / totalStats.gamesPlayed).toFixed(1)) : 0;
    totalStats.apg = totalStats.gamesPlayed > 0 ? parseFloat((totalStats.ast / totalStats.gamesPlayed).toFixed(1)) : 0;
    totalStats.rpg = totalStats.gamesPlayed > 0 ? parseFloat((totalStats.treb / totalStats.gamesPlayed).toFixed(1)) : 0;

  
    return totalStats;
  }
  
  
  

  async findAll(): Promise<PlayerMatchStats[]> {
    return this.statsRepository.find({ relations: ['player', 'match'] });
  }

  async findByPlayer(playerId: number): Promise<PlayerMatchStats[]> {
    return this.statsRepository.find({ where: { player: { id: playerId } }, relations: ['match'] });
  }

  async update(id: number, dto: UpdatePlayerMatchStatsDto): Promise<PlayerMatchStats> {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException('Estatísticas não encontradas.');

    Object.assign(stats, dto);
    return this.statsRepository.save(stats);
  }

  async remove(id: number): Promise<void> {
    const stats = await this.statsRepository.findOne({ where: { id } });
    if (!stats) throw new NotFoundException('Estatísticas não encontradas.');

    await this.statsRepository.remove(stats);
  }
}
