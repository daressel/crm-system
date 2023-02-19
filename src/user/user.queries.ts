import { Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/decorators';
import { Repository } from 'typeorm';
import { User } from './models/user.model';

@Resolver(() => User)
@Injectable()
export class UserQueries {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => String, { nullable: true })
  @UseGuards()
  async me(@CurrentUser() asd) {
    return 'asdas';
    // return this.userRepository.findOneBy({email: 'asdasd'});
  }
}
