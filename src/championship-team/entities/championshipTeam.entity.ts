import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Team } from '../../teams/entities/team.entity';
  import { Championship } from 'src/championship/entities/championship.entity';
  
  @Entity()
  export class ChampionshipTeam {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Championship, (championship) => championship.championshipTeams, { onDelete: 'CASCADE' })
    championship: Championship;
  
    @ManyToOne(() => Team, (team) => team.championshipTeams, { onDelete: 'CASCADE' })
    team: Team;
  
    @CreateDateColumn()
    joinedAt: Date;
  }
  