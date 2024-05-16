import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  created_at: string;

  @Column({ default: null })
  text: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  audion: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
