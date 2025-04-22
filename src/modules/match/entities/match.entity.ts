import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Team } from '../../teams/entities/team.entity';
  import { Championship } from 'src/modules/championship/entities/championship.entity';
import { PlayerMatchStats } from 'src/modules/player-match-stats/entities/player-match-stats.entity';
  
  @Entity()
  export class Match {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Championship, (championship) => championship.matches, { nullable: false })
    championship: Championship;
  
    @ManyToOne(() => Team, { nullable: false })
    teamHome: Team;
  
    @ManyToOne(() => Team, { nullable: false })
    teamAway: Team;
  
    @Column({ type: 'timestamp' })
    date: Date;
  
    @Column({ type: 'int', nullable: true })
    homeScore: number;
  
    @Column({ type: 'int', nullable: true })
    awayScore: number;
  
    @Column({
      type: 'enum',
      enum: ['Agendado', 'Em andamento', 'Finalizado'],
      default: 'Agendado',
    })
    status: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

     // Relacionamento com as estatísticas individuais dos jogadores por partida
    @OneToMany(() => PlayerMatchStats, (playerStats) => playerStats.match)
    playerStats: PlayerMatchStats[];
  }
  