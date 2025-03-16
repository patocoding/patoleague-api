import { IsNumber } from 'class-validator';

export class AssignPlayerTeamDto {
  @IsNumber()
  teamId: number;
}