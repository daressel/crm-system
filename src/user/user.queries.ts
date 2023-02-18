import { Resolver, Query } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './users.service';

@Resolver()
export class UserQueries {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  me() {
    this.usersService.me();
  }
}
