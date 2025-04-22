import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsInt()
  championshipId: number;

  @IsNotEmpty()
  @IsInt()
  team1Id: number;

  @IsNotEmpty()
  @IsInt()
  team2Id: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
