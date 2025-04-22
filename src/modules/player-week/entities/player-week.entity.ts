import { Player } from "src/modules/player/entities/player.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PlayerWeek {
  
  @PrimaryGeneratedColumn()  
  id: number;

  @ManyToOne(() => Player)
  @JoinColumn()
  player: Player;  // Relacionamento com o jogador

  @Column({ type: 'date' })
  date_from: Date;

  @Column({ type: 'date' })
  date_to: Date;

  @Column({type: 'boolean', default: false})
  is_active: boolean;

  @Column({ type: 'int', nullable: true })
  week_number: number;

  @Column({ type: 'text', nullable: true })
  comment: string;
}