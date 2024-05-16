import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chat_name: string;

  @Column()
  created_at: string;

  @Column()
  archived: boolean;

  @ManyToOne(() => User, (user) => user.admin_chats)
  created_by: User;

  @ManyToMany(() => User, (user) => user.participant_chat)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
