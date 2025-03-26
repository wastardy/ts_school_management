import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import errorConstants from 'src/constants/error.constants';
import { CreateStudentInput } from './inputs/student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException(errorConstants.STUDENT_NOT_FOUND);
    }

    return student;
  }

  async createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const { firstName, lastName, group } = createStudent;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
      group,
    });

    return this.studentRepository.save(student);
  }
}
