import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Team } from '../../teams/entities/team.entity';
  import { Championship } from 'src/championship/entities/championship.entity';
  
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
  }
  