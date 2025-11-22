import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStatusBadge } from '../task-status-badge/task-status-badge';
import { RouterLink } from "@angular/router";
import { TaskHover } from '../directives/task-hover';

@Component({
  selector: 'app-task-list',
  imports: [TaskStatusBadge, RouterLink, TaskHover],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  //Pass tasks from parent to child
  // @Input({ required: true }) tasks: Task[] = []
  tasks = input<Task[]>([])

  //Pass down from Parent to Child
  // @Input() selectedTaskId: number | null = null
  selectedTaskId = input<number | null>(null)

  //Pass selected task from child to parent
  // @Output() taskSelected = new EventEmitter<Task>()
  // @Output() taskToggled = new EventEmitter<Task>()
  // @Output() taskDeleted = new EventEmitter<number>()

  taskSelected = output<Task>()
  taskToggled = output<Task>()
  taskDeleted = output<number>()





  selectTask(task: Task) {
    this.taskSelected.emit(task)
  }

  toggleTask(task: Task) {
    this.taskToggled.emit(task)
  }

  deleteTask(task: Task, event: MouseEvent) {
    event.stopPropagation()
    this.taskDeleted.emit(task.id)
  }

}
