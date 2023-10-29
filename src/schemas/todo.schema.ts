import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity.schema';
import { Document } from 'mongoose';

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: [{ type: ActivitySchema }] })
  activities: Activity[];
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.pre<TodoDocument>('save', function (next) {
  if (
    this.isModified('title') ||
    this.isModified('description') ||
    this.isModified('completed')
  ) {
    const activity = new Activity({
      description: `Todo updated: ${this.title} - ${this.description} - ${
        this.completed ? 'completed' : 'incomplete'
      }`,
    });
    this.activities.push(activity);
  }
  next();
});
