import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from 'src/todo/todo.schema';
import { Activity } from 'src/activity/activity.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = await new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async getAllTodos(): Promise<Todo[]> {
    const todoData = await this.todoModel.find();
    if (!todoData || todoData.length == 0) {
      return [];
    }
    return todoData;
  }

  async getTodo(todoId: Types.ObjectId): Promise<Todo> {
    const existingTodo = await this.todoModel.findById(todoId).exec();
    if (!existingTodo) {
      throw new NotFoundException(`Todo ${todoId} Not Found!`);
    }
    return existingTodo;
  }

  async updateTodo(
    todoId: Types.ObjectId,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const existingTodo = await this.todoModel.findByIdAndUpdate(
      todoId,
      updateTodoDto,
      { new: true },
    );

    if (!existingTodo) {
      throw new NotFoundException(`Todo ${todoId} Not Found!`);
    }

    return existingTodo;
  }

  async deleteTodo(todoId: Types.ObjectId): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      throw new NotFoundException(`Todo ${todoId} Not Found!`);
    }
    return deletedTodo;
  }
}
