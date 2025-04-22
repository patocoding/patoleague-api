import { IsOptional, IsInt } from 'class-validator';

export class UpdateStandingDto {
  @IsOptional()
  @IsInt()
  points?: number;

  @IsOptional()
  @IsInt()
  matchesPlayed?: number;

  @IsOptional()
  @IsInt()
  wins?: number;

  @IsOptional()
  @IsInt()
  losses?: number;

  @IsOptional()
  @IsInt()
  pointsFor?: number;

  @IsOptional()
  @IsInt()
  pointsAgainst?: number;

  @IsOptional()
  @IsInt()
  pointsDifference?: number;
}
