import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../todo.enum';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly description: string;

  readonly status: TodoStatus;
}
