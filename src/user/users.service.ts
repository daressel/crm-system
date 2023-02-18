import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationInput, LoginInput, UserUpdateInput } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async me(): Promise<User> {
    return this.userRepository.findOneBy({ id: 'asdasd' });
  }

  async registration(input: RegistrationInput): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  async login(input: LoginInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: input.email });
    return user;
  }

  async updateUser(input: UserUpdateInput): Promise<User> {
    const { id } = input;
    const updatedUser = await this.userRepository.preload({
      id,
      ...input,
    });
    return this.userRepository.save(updatedUser);
  }
}
