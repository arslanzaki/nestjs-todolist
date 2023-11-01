import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Types } from 'mongoose';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('todo/:id')
  getTodoActivities(@Param('id') todoId: string) {
    const _id = new Types.ObjectId(todoId);
    return this.activityService.getTodoActivities(_id);
  }
}
