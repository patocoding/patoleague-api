import { IsOptional, IsDateString } from 'class-validator';

export class UpdatePlayerTeamDto {
  @IsOptional()
  @IsDateString()
  leftAt?: string;
}
