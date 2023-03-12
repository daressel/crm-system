import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.model';
import { User } from '../User/models/user.model';
import { ProductHistory } from './models/productHiistory.model';
import { ProductMutations } from './product.mutations';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, ProductHistory])],
  providers: [User, Product, ProductHistory, ProductMutations],
})
export class ProductsModule {}
