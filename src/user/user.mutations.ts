import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, RegistrationInput, UserUpdateInput } from './dto';
import { User } from './models/user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserMutations {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => User)
  registration(
    @Args('registrationInput') registrationInput: RegistrationInput,
  ) {
    return this.usersService.registration(registrationInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UserUpdateInput) {
    return this.usersService.updateUser(updateUserInput);
  }
}
