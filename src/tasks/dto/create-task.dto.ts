import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'user id must not be empty' })
  userId: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
