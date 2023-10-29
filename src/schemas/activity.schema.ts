import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Activity {
  constructor(activity?: Partial<Activity>) {
    Object.assign(this, activity);
  }
  @Prop()
  description: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export type ActivityDocument = Activity & Document;
export const ActivitySchema = SchemaFactory.createForClass(Activity);
