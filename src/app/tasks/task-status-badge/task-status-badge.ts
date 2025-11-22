import { Component, Input } from '@angular/core';
import { TaskStatus } from '../models/task.model';

@Component({
  selector: 'app-task-status-badge',
  imports: [],
  templateUrl: './task-status-badge.html',
  styleUrl: './task-status-badge.scss',
})
export class TaskStatusBadge {
  @Input({ required: true }) status!: TaskStatus

  get label(): string {
    switch (this.status) {
      case 'todo':
        return 'To do';
      case 'in-progress':
        return 'In progress';
      case 'done':
        return 'Done';
      default:
        return this.status;
    }
  }





}
