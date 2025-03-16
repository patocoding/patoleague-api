import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChampionshipTeamDto {
  @IsNotEmpty()
  @IsInt()
  championshipId: number;

  @IsNotEmpty()
  @IsInt()
  teamId: number;
}