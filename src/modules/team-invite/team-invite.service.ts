import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamInvite } from './entities/teamInvite.entity';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Player } from '../player/entities/player.entity';
import { User } from '../user/entities/user.entity';
import { PlayerTeam } from 'src/modules/player-team/entities/playerTeam.entity';

@Injectable()
export class TeamInviteService {
  constructor(
    @InjectRepository(TeamInvite)
    private inviteRepo: Repository<TeamInvite>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    @InjectRepository(Player)
    private playerRepo: Repository<Player>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(PlayerTeam) 
    private playerTeamRepo: Repository<PlayerTeam>,
  ) {}

  async invitePlayer(teamId: number, playerId: number, invitedById: number) {
    
    const team = await this.teamRepo.findOne({ where: { id: teamId }, relations: ['createdBy'] });
    if (!team) throw new NotFoundException('Time não encontrado');
    if (team.createdBy.id !== invitedById) throw new NotFoundException('Apenas o dono do time pode convidar jogadores');

    const player = await this.playerRepo.findOne({ where: { id: playerId } });
    if (!player) throw new NotFoundException('Jogador não encontrado');

    const existingInvite = await this.inviteRepo.findOne({ where: { team, player, status: 'pending' } });
    if (existingInvite) throw new NotFoundException('Convite já enviado');

    const invite = this.inviteRepo.create({ team, player, invitedBy: team.createdBy, status: 'pending' });
    return this.inviteRepo.save(invite);
  }

  async getPlayerInvites(playerId: number) {
    return this.inviteRepo.find({ where: { player: { id: playerId }, status: 'pending' }, relations: ['team'] });
  }

  async getPlayerInvitesByNickname(nickname: string) {
    return this.inviteRepo.find({
      where: { player: { nickname }, status: 'pending' },
      relations: ['team'],
    });
  }
  
  async respondToInvite(inviteId: number, response: "accepted" | "declined") {
    const invite = await this.inviteRepo.findOne({
      where: { id: inviteId },
      relations: ["player", "team"],
    });

    if (!invite) {
      throw new NotFoundException("Convite não encontrado.");
    }

    if (response === "accepted") {
      // Verificar se o jogador já está em um time
      const player = await this.playerRepo.findOne({
        where: { id: invite.player.id },
        relations: ["team"],
      });

      if (player.team) {
        throw new BadRequestException("Você já está em um time e não pode aceitar este convite.");
      }

      // Atualiza a FK do jogador para o novo time
      player.team = invite.team;
      await this.playerRepo.save(player);

      // 🔥 Adiciona uma nova entrada no histórico (PlayerTeam)
      await this.playerTeamRepo.save({
        player,
        team: invite.team,
        joinedAt: new Date(),
      });
    }

    invite.status = response;
    await this.inviteRepo.save(invite);

    return { message: `Convite ${response === "accepted" ? "aceito" : "recusado"} com sucesso.` };
  }

  
  
}
