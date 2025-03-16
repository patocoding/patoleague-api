import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
import { PlayerTeam } from 'src/player-team/entities/playerTeam.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true }) 
  nickname: string;
  
    @Column({ type: 'int', nullable: true })
    jerseyNumber: number; // Número da camisa
  
    @Column({ type: 'varchar', length: 50 })
    position: string; // Posição: "Armador", "Ala", "Pivô", etc.
  
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    height: number; // Altura em metros (ex: 1.98)
  
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    weight: number; // Peso em kg (ex: 95.5)
  
    @Column({ type: 'int', nullable: true })
    age: number; // Idade do jogador
  
    @Column({ type: 'int', default: 0 })
    pointsPerGame: number; 
  
    @Column({ type: 'int', default: 0 })
    assistsPerGame: number; 
  
    @Column({ type: 'int', default: 0 })
    reboundsPerGame: number; 

    @Column({ type: 'int', default: 0 })
    totalPoints: number;
  
    @Column({ type: 'int', default: 0 })
    totalAssists: number; 
  
    @Column({ type: 'int', default: 0 })
    totalRebounds: number; // Média de rebotes por jogo
  
    @ManyToOne(() => Team, (team) => team.players, { nullable: true, onDelete: 'SET NULL' })
    team: Team;
  
    @OneToOne(() => User, (user) => user.player, { onDelete: 'CASCADE' }) 
    @JoinColumn() 
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({type: 'int', nullable: true})
    gamesPlayed: number

    @OneToMany(() => PlayerTeam, (playerTeam) => playerTeam.player)
    playerTeams: PlayerTeam[];

    @Column({nullable:true}) 
    photoUrl:string
  }