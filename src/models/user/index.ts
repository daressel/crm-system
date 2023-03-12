import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from '../Product/models/productHiistory.model';
import { UserIdentity } from './models/user.identity.model';
import { User } from './models/user.model';
import { UserMutations } from './user.mutations';
import { UserQueries } from './user.queries';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserIdentity, ProductHistory])],
  providers: [User, UserIdentity, UserMutations, UserQueries],
})
export class UsersModule {}
