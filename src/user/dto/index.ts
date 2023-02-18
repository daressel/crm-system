import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class RegistrationInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String)
  @IsOptional()
  firstName?: string;

  @Field(() => String)
  @IsOptional()
  lastName?: string;
}
