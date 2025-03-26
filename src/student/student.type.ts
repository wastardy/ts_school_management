import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  group: string;
}
