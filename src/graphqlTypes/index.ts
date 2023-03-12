import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UniqueInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}
