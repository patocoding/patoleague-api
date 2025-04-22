import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Player } from 'src/modules/player/entities/player.entity';
import { Match } from 'src/modules/match/entities/match.entity';

@Entity()
export class PlayerMatchStats {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, (player) => player.matchStats, { eager: true, onDelete: 'CASCADE' })
    player: Player;

    @ManyToOne(() => Match, (match) => match.playerStats, { eager: true, onDelete: 'CASCADE' })
    match: Match;

    @Column({ default: 0 }) fgm: number;
    @Column({ default: 0 }) fga: number;
    @Column({ type: 'float', default: 0 }) fgPercent: number;
    
    @Column({ default: 0 }) threePm: number;
    @Column({ default: 0 }) threePa: number;
    @Column({ type: 'float', default: 0 }) threePPercent: number;
    
    @Column({ default: 0 }) ftm: number;
    @Column({ default: 0 }) fta: number;
    @Column({ type: 'float', default: 0 }) ftPercent: number;

    @Column({ default: 0 }) oreb: number;
    @Column({ default: 0 }) dreb: number;
    @Column({ default: 0 }) treb: number;

    @Column({ default: 0 }) ast: number;
    @Column({ default: 0 }) stl: number;
    @Column({ default: 0 }) blk: number;
}
