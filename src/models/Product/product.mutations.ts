import { Injectable } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput, UpdateProductInput } from './dto';
import { Product } from './models/product.model';
import { ProductHistory } from './models/productHiistory.model';
import { UniqueInput } from 'src/graphqlTypes';

@Injectable()
@Resolver(() => Product)
export class ProductMutations {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductHistory)
    private readonly productHistoryRepository: Repository<ProductHistory>,
  ) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    const newProduct = this.productRepository.create(input);
    const createdNewProduct = await this.productRepository.save(newProduct);
    return createdNewProduct;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('where') where: UniqueInput,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    const updatedProduct = await this.productRepository.save({
      id: where.id,
      ...input,
    });
    return updatedProduct;
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('where') where: UniqueInput): Promise<Product> {
    const deletedProduct = await this.productRepository.findOneBy({
      id: where.id,
    });
    await this.productRepository.delete(where.id);
    console.log(deletedProduct);
    return deletedProduct;
  }
}
