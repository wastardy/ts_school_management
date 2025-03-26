import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsArray,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateLessonInput {
  @IsNotEmpty()
  @MinLength(3)
  @Field()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  endDate: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  @Field(() => [String])
  students: string[];
}
