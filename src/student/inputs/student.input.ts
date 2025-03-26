import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @Field()
  lastName: string;

  @IsNotEmpty()
  @MinLength(2)
  @Field()
  group: string;
}
