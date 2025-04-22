import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Team } from '../../teams/entities/team.entity';
  import { Championship } from 'src/modules/championship/entities/championship.entity';
  
  @Entity()
  export class Standing {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Championship, { nullable: false })
    championship: Championship;
  
    @ManyToOne(() => Team, { nullable: false })
    team: Team;
  
    @Column({ type: 'int', default: 0 })
    points: number;
  
    @Column({ type: 'int', default: 0 })
    matchesPlayed: number;
  
    @Column({ type: 'int', default: 0 })
    wins: number;
  
    @Column({ type: 'int', default: 0 })
    losses: number;
  
    @Column({ type: 'int', default: 0 })
    pointsFor: number;
  
    @Column({ type: 'int', default: 0 })
    pointsAgainst: number;
  
    @Column({ type: 'int', default: 0 })
    pointsDifference: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  