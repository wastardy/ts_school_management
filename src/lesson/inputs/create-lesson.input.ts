import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsDateString } from 'class-validator';

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
}
