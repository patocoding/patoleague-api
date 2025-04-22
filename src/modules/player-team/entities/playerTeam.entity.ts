import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Player } from '../../player/entities/player.entity';
  import { Team } from '../../teams/entities/team.entity';
  
  @Entity()
  export class PlayerTeam {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Player, (player) => player.playerTeams, { eager: true })
    player: Player;
  
    @ManyToOne(() => Team, (team) => team.playerTeams, { eager: true })
    team: Team;
  
    @Column({ type: 'date' })
    joinedAt: Date;
  
    @Column({ type: 'date', nullable: true })
    leftAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  