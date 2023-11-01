import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TodoStatus } from 'src/todo/todo.enum';

@Schema({ timestamps: true })
export class Activity {
  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({required: true})
  todoId: Types.ObjectId

  @Prop({required: true})
  title: string

  @Prop({required: true})
  description: string

  @Prop({ required: true, enum: TodoStatus, default: TodoStatus.PENDING })
  status: TodoStatus;
}

export type ActivityDocument = Activity & Document;
export const ActivitySchema = SchemaFactory.createForClass(Activity);
