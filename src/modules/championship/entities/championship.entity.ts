import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Match } from 'src/modules/match/entities/match.entity';
import { ChampionshipTeam } from 'src/modules/championship-team/entities/championshipTeam.entity';

  
  @Entity()
  export class Championship {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @Column({ type: 'date' })
    startDate: Date;
  
    @Column({ type: 'date' })
    endDate: Date;
  
    @Column({ nullable: true })
    location: string;
  
    @OneToMany(() => Match, (match) => match.championship)
    matches: Match[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: true }) 
    isActive: boolean;

    @OneToMany(() => ChampionshipTeam, (championshipTeam) => championshipTeam.championship)
    championshipTeams: ChampionshipTeam[];

    @Column({ type: 'enum', enum: ['5v5', '3v3'], default: '5v5' })
    format: '5v5' | '3v3';
  }
  