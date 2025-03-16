import { Player } from 'src/player/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  fullName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Team, (team) => team.createdBy)
  teams: Team[];

  @OneToOne(() => Player, (player) => player.user, { cascade: true })
  player: Player;

  @Column({ default: false })
  isAdmin: boolean;

  // 🔥 Novo campo para indicar qual time o usuário criou
  @ManyToOne(() => Team, (team) => team.owners, { nullable: true, onDelete: 'SET NULL' })
  team: Team;
}
