import { Injectable } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput, UniqueInput } from 'src/graphqlTypes';
import { Repository } from 'typeorm';
import { Products } from './dto';
import { Product } from './models/product.model';

@Resolver(Product)
@Injectable()
export class ProductQueries {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Query(() => Product, { nullable: true })
  async product(@Args('where') where: UniqueInput) {
    const product = await this.productRepository.findOneBy({ id: where.id });
    return product;
  }

  @Query(() => Products, { nullable: true })
  async products(
    @Args('where') where: UniqueInput,
    @Args('pagination') pagination: PaginationInput,
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
