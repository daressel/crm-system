import { Injectable } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'graphql';
import { verifyToken } from 'src/utils/jwt';
import { Repository } from 'typeorm';
import {
  GetTokenForRegistration,
  LoginInput,
  RegistrationInput,
  UserUpdateInput,
} from './dto';
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

  @Mutation(() => String)
  async getRegistrationToken(@Args('input') input: GetTokenForRegistration) {
    return;
  }

  @Mutation(() => User)
  async registration(@Args('input') input: RegistrationInput) {
    const { encryptedCode, token, verifyCode } = input;
    const { email, firstName, lastName, password } =
      verifyToken<GetTokenForRegistration>(token);

    const createdUser = this.userRepository.create({
      email,
      firstName,
      lastName,
    });
    const savedUser = await this.userRepository.save(createdUser);
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
