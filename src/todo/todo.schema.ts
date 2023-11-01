import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from '../activity/activity.schema';
import { Document, Types } from 'mongoose';
import { TodoStatus } from './todo.enum';

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TodoStatus, default: TodoStatus.PENDING })
  status: TodoStatus;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
