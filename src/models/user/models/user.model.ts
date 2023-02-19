import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  firstName: string;
  @Column()
  @Field(() => String)
  lastName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ default: 'user' })
  @Field(() => String, { nullable: true })
  role?: string;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isOnline: boolean;
  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isActive: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
