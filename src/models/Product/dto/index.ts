import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../models/product.model';

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

@ObjectType()
export class Products {
  @Field(() => [Product])
  items: Product[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@ObjectType()
export class ProductsOrderByInput {
  @Field(() => [Product])
  items: Product[];

  @Field(() => Int, { nullable: true })
  count?: number;
}
