import { IsNotEmpty, IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear()) // Garante que o ano de fundação seja válido
  foundedYear?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  championshipsWon?: number;

  @IsOptional()
  createdById?: number; // ID do usuário que criou o time
}