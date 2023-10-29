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

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

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
  updateTodo(
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const _id = new Types.ObjectId(todoId);
    return this.todoService.updateTodo(_id, updateTodoDto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.todoService.deleteTodo(_id);
  }

  @Get('activity/:id')
  getTodoActivity(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.todoService.getTodoActivity(_id);
  }
}
