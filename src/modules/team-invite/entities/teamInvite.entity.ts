import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { Player } from '../../player/entities/player.entity';
  import { Team } from 'src/modules/teams/entities/team.entity';
  import { User } from '../../user/entities/user.entity';
  
  @Entity()
  export class TeamInvite {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Team, (team) => team.invites, { onDelete: 'CASCADE' })
    @JoinColumn()
    team: Team;
  
    @ManyToOne(() => Player, { onDelete: 'CASCADE' })
    @JoinColumn()
    player: Player;
  
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    invitedBy: User; // Usuário que criou o time e enviou o convite
  
    @Column({ type: 'enum', enum: ['pending', 'accepted', 'declined'], default: 'pending' })
    status: 'pending' | 'accepted' | 'declined';
  
    @CreateDateColumn()
    createdAt: Date;
  }
  