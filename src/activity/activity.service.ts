import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './activity.schema';
import { Model, Types } from 'mongoose';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    private todoService: TodoService,
  ) {}

  async createActivity(todoId: Types.ObjectId) {
    const todo = await this.todoService.getTodo(todoId);
    if (!todo) {
      return null;
    }
    const { title, description, status } = todo;
    const activity = new this.activityModel({ title, description, status });
    activity.todoId = todoId;
    await activity.save();
  }

  async getTodoActivities(todoId: Types.ObjectId) {
    const activities = await this.activityModel.find({ todoId }).exec();
    if (!activities) {
      return [];
    }
    return activities;
  }
}
