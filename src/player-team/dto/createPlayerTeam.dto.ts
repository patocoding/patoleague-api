import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreatePlayerTeamDto {
  @IsNotEmpty()
  playerId: number;

  @IsNotEmpty()
  teamId: number;

  @IsDateString()
  joinedAt: string;

  @IsOptional()
  @IsDateString()
  leftAt?: string;
}