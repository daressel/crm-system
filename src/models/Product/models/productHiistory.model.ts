import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/models/User/models/user.model';

@Entity()
@ObjectType()
export class ProductHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => ID)
  title: string;

  @Column()
  @Field(() => ID)
  price: number;

  @Column()
  @Field(() => String)
  action: string;

  @ManyToOne(() => User, (user) => user.historyProducts)
  actionBy: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
