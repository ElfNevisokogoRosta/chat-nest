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

  @Column('simple-array')
  chat_name: string[];

  @Column({ default: 'private' })
  type: 'private' | 'group';

  @Column()
  created_at: string;

  @Column()
  archived: boolean;

  @ManyToOne(() => User, (user) => user.admin_chats)
  created_by: User;

  @ManyToMany(() => User, (user) => user.participant_chat)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];
}
