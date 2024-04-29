import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus } from './task-status.enum';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(CreateTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const record = await this.tasksRepository.findOne({ where: { id, user } });

    if (!record) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return record;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException('Task Not Found');
    }
    console.log(result);
  }

  async updateTaskStatusById(
    id: string,
    status: taskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }
}
