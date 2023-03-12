import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UniqueInput {
  @Field(() => ID)
  id: string;
}
