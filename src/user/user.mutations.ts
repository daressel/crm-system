import { Injectable } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginInput, RegistrationInput, UserUpdateInput } from './dto';
import { User } from './models/user.model';

@Injectable()
@Resolver(() => User)
export class UserMutations {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Mutation(() => User)
  async login(@Args('input') input: LoginInput) {
    const user = await this.userRepository.findOneBy({ email: input.email });
    return user;
  }

  @Mutation(() => User)
  async registration(@Args('input') input: RegistrationInput) {
    const createdUser = this.userRepository.create(input);
    const savedUser = await this.userRepository.save(createdUser);
    console.log(savedUser);
    return savedUser;
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UserUpdateInput) {
    const { id } = input;
    const updatedUser = await this.userRepository.preload({
      id,
      ...input,
    });
    return this.userRepository.save(updatedUser);
  }
}
