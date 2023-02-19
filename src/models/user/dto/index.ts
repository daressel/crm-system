import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class GetTokenForRegistration {
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
export class RegistrationInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  encryptedCode: string;

  @Field(() => String)
  verifyCode: string;
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

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lastName?: string;
}
