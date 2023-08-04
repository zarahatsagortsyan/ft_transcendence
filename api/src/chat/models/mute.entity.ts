import { User } from "src/user/models/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Mute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  finishAt: Date;

  @CreateDateColumn({ default: () => "now()" })
  checkAt: Date;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(() => User, user => user.mutes)
  muted: User;

  @ManyToOne(() => Chat, chat => chat.muted)
  chat: Chat;
}
