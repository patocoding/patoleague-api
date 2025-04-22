import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTeamInviteDto {
  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @IsNotEmpty()
  @IsNumber()
  playerId: number;

  @IsNotEmpty()
  @IsNumber()
  invitedById: number;
}
