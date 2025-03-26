import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'a6f1b2c3',
      name: 'Algorithms & Data Structures',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
