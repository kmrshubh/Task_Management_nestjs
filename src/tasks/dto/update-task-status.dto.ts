import { IsEnum } from 'class-validator';
import { taskStatus } from '../task-status.enum';

export class UpdateTaskStatusDTO {
  @IsEnum(taskStatus)
  status: taskStatus;
}
