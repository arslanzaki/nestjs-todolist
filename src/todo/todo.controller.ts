import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Types } from 'mongoose';
import { ActivityService } from 'src/activity/activity.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly activityService: ActivityService,
  ) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  getTodo(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.todoService.getTodo(_id);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const _id = new Types.ObjectId(todoId);
    const updatedTodo = await this.todoService.updateTodo(_id, updateTodoDto);
    console.log(updatedTodo,'up')
    await this.activityService.createActivity(_id);
    return updatedTodo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.todoService.deleteTodo(_id);
  }

  @Get(':id/activities')
  getTodoActivities(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.activityService.getTodoActivities(_id);
  }
}
