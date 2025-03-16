// import {
//     Entity,
//     PrimaryGeneratedColumn,
//     Column,
//     OneToOne,
//     OneToMany,
//     ManyToOne,
//     CreateDateColumn,
//     UpdateDateColumn,
//   } from 'typeorm';
//   import { Championship } from 'src/championship/entities/championship.entity';
//   import { PlayoffRound } from './playoffRound.entity';
//   import { PlayoffTeam } from './playoffTeam.entity';
  
//   @Entity()
//   export class Playoff {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column({ default: false })
//     isCompleted: boolean;
  
//     @OneToOne(() => Championship, (championship) => championship.playoff, { onDelete: 'CASCADE' })
//     championship: Championship;
  
//     @OneToMany(() => PlayoffRound, (round) => round.playoff)
//     rounds: PlayoffRound[];
  
//     @OneToMany(() => PlayoffTeam, (team) => team.playoff)
//     teams: PlayoffTeam[];
  
//     @CreateDateColumn()
//     createdAt: Date;
  
//     @UpdateDateColumn()
//     updatedAt: Date;
//   }
  