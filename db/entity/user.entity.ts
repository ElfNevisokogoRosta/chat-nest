import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: string;

  @Column({ default: null })
  first_name: string;

  @Column({ default: null })
  last_name: string;

  @Column()
  online: boolean;

  @Column()
  last_time_active: string;

  @OneToMany(() => Chat, (chat) => chat.created_by)
  admin_chats: Chat[];

  @ManyToMany(() => Chat, (chat) => chat.members)
  @JoinTable()
  participant_chat: Chat[];
}
