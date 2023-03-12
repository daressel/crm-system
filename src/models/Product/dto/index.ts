import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class UpdateProductInput {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  price: number;
}

@InputType()
export class DeleteProductInput {
  @Field(() => ID)
  id: string;
}
