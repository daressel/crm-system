import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIdentity } from './models/user.identity.model';
import { User } from './models/user.model';
import { UserMutations } from './user.mutations';
import { UserQueries } from './user.queries';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserIdentity])],
  providers: [User, UserIdentity, UserMutations, UserQueries],
})
export class UsersModule {}
