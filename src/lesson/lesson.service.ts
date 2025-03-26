import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { v4 as uuid } from 'uuid';
import errorConstants from '../constants/error.constants';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) {
      throw new NotFoundException(errorConstants.LESSON_NOT_FOUND);
    }

    return lesson;
  }

  async createLesson(createLesson: CreateLessonDto): Promise<Lesson> {
    const { name, startDate, endDate } = createLesson;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return this.lessonRepository.save(lesson);
  }
}
