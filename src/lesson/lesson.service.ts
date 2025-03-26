import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { v4 as uuid } from 'uuid';
import errorConstants from '../constants/error.constants';
import { AssignStudentsToLessonInput } from './inputs/assign-students-to-lesson.input';

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

    if (!lesson.students) lesson.students = [];

    return lesson;
  }

  async getAllLessons(): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find();

    const allLessons = lessons.map((lesson) => {
      if (!lesson.students) lesson.students = [];

      return lesson;
    });

    return allLessons;
  }

  async createLesson(createLesson: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLesson;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;

    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });

    if (!lesson) {
      throw new NotFoundException(errorConstants.LESSON_NOT_FOUND);
    }

    if (!lesson.students) lesson.students = [];

    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepository.save(lesson);
  }
}
