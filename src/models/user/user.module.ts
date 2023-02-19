import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserMutations } from './user.mutations';
import { UserQueries } from './user.queries';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [User, UserMutations, UserQueries],
})
export class UsersModule {}
