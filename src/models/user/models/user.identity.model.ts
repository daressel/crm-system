import { User } from 'src/models/User/models/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserIdentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  password: string;
}
