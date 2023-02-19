import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { getToken, verifyToken } from 'src/utils/jwt';
import { Repository } from 'typeorm';
import { UserIdentity } from './models/user.identity.model';
import {
  GetTokenForRegistration,
  LoginInput,
  RegistrationInput,
  UserUpdateInput,
} from './dto';
import { User } from './models/user.model';
import { TokenForRegistration } from 'src/types/common';
import { compareBcrypt, hashBcrypt } from 'src/utils/bcrypt';
import { VerifyCodeIsNotCorrect } from './user.errors';

@Injectable()
@Resolver(() => User)
export class UserMutations {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserIdentity)
    private readonly userIdentityRepository: Repository<UserIdentity>,
  ) {}

  @Mutation(() => User)
  async login(@Args('input') input: LoginInput) {
    const user = await this.userRepository.findOneBy({ email: input.email });
    return user;
  }

  @Mutation(() => String)
  async getRegistrationToken(
    @Args('input') input: GetTokenForRegistration,
  ): Promise<string> {
    const verifyCode = crypto.randomBytes(2).toString('hex').toUpperCase();
    console.log(verifyCode);
    const encryptedCode = await hashBcrypt(verifyCode);
    const token = getToken<TokenForRegistration>({ ...input, encryptedCode });
    return token;
  }

  @Mutation(() => User)
  async registration(@Args('input') input: RegistrationInput): Promise<User> {
    const { token, verifyCode } = input;
    const { email, firstName, lastName, password, encryptedCode } = verifyToken<
      GetTokenForRegistration & { encryptedCode: string }
    >(token);

    const isComplete = await compareBcrypt(verifyCode, encryptedCode);
    if (!isComplete) throw VerifyCodeIsNotCorrect;

    const encodePassword = await hashBcrypt(password);

    const createdUserIdentity = this.userIdentityRepository.create({
      user: {
        email,
        firstName,
        lastName,
      },
      password: encodePassword,
    });

    const savedUserIdentity = await this.userIdentityRepository.save(
      createdUserIdentity,
    );
    return savedUserIdentity.user;
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<User> {
    const { id } = input;
    const updatedUser = await this.userRepository.preload({
      id,
      ...input,
    });
    return this.userRepository.save(updatedUser);
  }
}
