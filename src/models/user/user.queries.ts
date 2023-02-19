import { Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query, GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CtxUser } from 'src/types/common';
import { Me } from 'src/utils/decorators';
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
  async me(@Me() { id, role }: CtxUser) {
    console.log(id);
    // console.log(asd);
    return 'asdas';
    // return this.userRepository.findOneBy({email: 'asdasd'});
  }
}
