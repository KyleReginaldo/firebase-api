import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {} from 'class-validator';
import { Task } from './task.entity';
import { Param } from '@nestjs/common/decorators';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<void> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  getTasksById(@Param('id') id: string): Promise<Task[]> {
    return this.tasksService.getTasksById(id);
  }
}
