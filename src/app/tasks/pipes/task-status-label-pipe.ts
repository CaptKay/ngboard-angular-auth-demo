import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../models/task.model';

@Pipe({
  name: 'taskStatusLabel'
})
export class TaskStatusLabelPipe implements PipeTransform {

  transform(value: TaskStatus): string {
    switch (value){
      case 'todo':
        return "To do"
      case 'in-progress':
        return 'In Progress'
    case 'done':
        return 'Done'
      default:
        return value
    }
  }

}
