import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Player } from '../../player/entities/player.entity';
  import { User } from '../../user/entities/user.entity';
import { PlayerTeam } from 'src/player-team/entities/playerTeam.entity';
import { TeamInvite } from 'src/team-invite/entities/teamInvite.entity';
import { ChampionshipTeam } from 'src/championship-team/entities/championshipTeam.entity';
  
  @Entity()
  export class Team {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    name: string;
  
    @Column({ nullable: true })
    city: string;
  
    @Column({ nullable: true })
    state: string;
  
    @Column({ type: 'int', nullable: true })
    foundedYear: number;
  
    @Column({ type: 'int', default: 0 })
    championshipsWon: number;
  
    @OneToMany(() => Player, (player) => player.team)
    players: Player[];  

    @OneToMany(() => User, (user) => user.team)
    owners: User[];
    
    @OneToMany(() => ChampionshipTeam, (championshipTeam) => championshipTeam.team)
    championshipTeams: ChampionshipTeam[];

    @ManyToOne(() => User, (user) => user.teams, { nullable: true }) 
    createdBy: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable:true})
    allTimePoints: number;

    @OneToMany(() => PlayerTeam, (playerTeam) => playerTeam.team)
    playerTeams: PlayerTeam[];
    
    @OneToMany(() => TeamInvite, (invite) => invite.team, { cascade: true })
    invites: TeamInvite[];

    @Column({ nullable:true}) 
    photoUrl:string
  }