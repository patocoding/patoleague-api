import { IsNotEmpty, IsOptional, IsDateString, IsString } from 'class-validator';

export class CreateChampionshipDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  createdById: number;
}