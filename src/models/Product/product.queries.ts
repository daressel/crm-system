import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationInput, UniqueInput } from 'src/graphqlTypes';
import { Repository } from 'typeorm';
import { Products, ProductsWhereInput } from './dto';
import { Product } from './models/product.model';

@Injectable()
@Resolver(() => Product)
export class ProductQueries {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Query(() => Product, { nullable: true })
  async product(@Args('where') where: UniqueInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: where.id });
    return product;
  }

  @UseGuards(AuthGuard)
  @Query(() => Products, { nullable: true })
  async products(
    @Args({ name: 'where', type: () => [ProductsWhereInput], nullable: true })
    where: ProductsWhereInput[],
    @Args({ name: 'pagination', type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
  ): Promise<Products> {
    const products = await this.productRepository.find({
      where,
      ...pagination,
    });
    return {
      items: products,
    };
  }
}
