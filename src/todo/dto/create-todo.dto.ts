import { IsNotEmpty, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly description: string;

  @IsBoolean()
  readonly completed: boolean;
}
