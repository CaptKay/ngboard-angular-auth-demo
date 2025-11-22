import { Component, input, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStatusBadge } from '../task-status-badge/task-status-badge';
import { TaskStatusLabelPipe } from '../pipes/task-status-label-pipe';

@Component({
  selector: 'app-task-detail',
  imports: [TaskStatusBadge, TaskStatusLabelPipe],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  // @Input() task: Task | null = null
  task = input<Task | null>(null)



}
