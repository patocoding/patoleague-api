import { Controller, Post, Get, Param, Patch, Body, BadRequestException } from '@nestjs/common';
import { TeamInviteService } from './team-invite.service';
import { PlayerService } from 'src/player/player.service';
import { Public } from 'src/auth/public.decorator';

@Controller('team-invites')
export class TeamInviteController {
  constructor(private readonly inviteService: TeamInviteService,
              private readonly playerService: PlayerService
  ) {}

  @Post('invite')
  @Public()
  invitePlayer(@Body() { teamId, playerId, invitedById }) {
    return this.inviteService.invitePlayer(teamId, playerId, invitedById);
  }

  @Get('player/:playerId')
  @Public()
  getPlayerInvites(@Param('playerId') playerId: number) {
    return this.inviteService.getPlayerInvites(playerId);
  }

  @Patch(':id/respond')
   @Public()
   respondToInvite(
    @Param('id') id: string,
    @Body() body: { response: string }
  ) {
    const validResponses = ["accepted", "declined"];
    
    if (!validResponses.includes(body.response)) {
      throw new BadRequestException(`Resposta inválida: ${body.response}`);
    }

    return this.inviteService.respondToInvite(+id, body.response as "accepted" | "declined");
  }

  @Get('player/nickname/:nickname')
  @Public()
    getPlayerInvitesByNickname(@Param('nickname') nickname: string) {
    return this.inviteService.getPlayerInvitesByNickname(nickname);
    }


}
