import { Injectable } from '@nestjs/common';
import { Resolver, Query, Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CtxUser, ReqRes } from 'src/types/common';
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
  async me(@Me() { id }: CtxUser) {
    console.log(id);
    // console.log(asd);
    return 'asdas';
    // return this.userRepository.findOneBy({email: 'asdasd'});
  }

  @Query(() => String, { nullable: true })
  async test(@Context() context: ReqRes) {
    console.log(context.req.headers);
    console.log(context.res.setHeader('Authorization', 'application/json'));
    // console.log(res.headers.set('authorization', 'asdasd'));
    return 'qwe';
  }
}
