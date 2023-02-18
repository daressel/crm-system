import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @Field(() => String)
  role: string;

  @Column('boolean')
  @Field(() => Boolean)
  isOnline: boolean;
  @Column('boolean')
  @Field(() => Boolean)
  isActive: boolean;

  @Column('date')
  @Field(() => String)
  createdAt: Date;
  @Column('date')
  @Field(() => String)
  updatedAt: Date;
}
