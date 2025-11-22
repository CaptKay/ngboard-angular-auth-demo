import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { TaskList } from '../../tasks/task-list/task-list';
import { TaskDetail } from '../../tasks/task-detail/task-detail';
import { Task, TaskFormValue } from '../../tasks/models/task.model';
import { TaskFilterBar } from '../../tasks/task-filter-bar/task-filter-bar';
import { TasksApiService } from '../../tasks/services/tasks-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskForm } from '../../tasks/task-form/task-form';

@Component({
  selector: 'app-dashboard',
  imports: [TaskList, TaskDetail, TaskFilterBar, TaskForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private tasksApi = inject(TasksApiService)
  private router = Inject(Router)
  private route = inject(ActivatedRoute)

  readonly tasks = signal<Task[]>([])
  readonly selectedTaskId = signal<number | null>(null)
  readonly filter = signal<'all' | 'done' | 'in-progress' | 'todo'>('all')

  readonly isLoading = signal(false)
  readonly error = signal<string | null>(null)

  ngOnInit(): void {
    const statusParam = this.route.snapshot.queryParamMap.get('status')

    if (statusParam === 'done') {
      this.filter.set('done')
    } else if (statusParam === 'in-progress') {
      this.filter.set('in-progress')
    } else if (statusParam === 'todo') {
      this.filter.set('todo')
    } else {
      this.filter.set('all')
    }


    this.loadTasks()
  }

  loadTasks(): void {
    this.isLoading.set(true)
    this.error.set(null)

    this.tasksApi.getTasks().subscribe({
      next: (res) => {
        this.tasks.set(res)
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Failed to load tasks', err)
        this.error.set('Failed to load tasks. Please, try again.')
        this.isLoading.set(false)
      }
    })
  }

  // readonly tasks = signal<Task[]>([
  //   {
  //     id: 1,
  //     title: 'Install Angular CLI',
  //     description: 'Make sure Angular CLI 20+ is installed globally.',
  //     status: 'todo',
  //   },
  //   {
  //     id: 2,
  //     title: 'Create NgBoard project',
  //     description: 'Scaffold a modern Angular 20 app with standalone & zoneless.',
  //     status: 'in-progress',
  //   },
  //   {
  //     id: 3,
  //     title: 'Build Task Dashboard',
  //     description: 'Use signals, @if, and @for for UI logic.',
  //     status: 'done',
  //   },
  // ])


  setFilter(filter: 'all' | 'done' | 'in-progress' | 'todo') {
    this.filter.set(filter)

    const statusParam = filter === 'all' ? null : filter

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: statusParam },
      queryParamsHandling: 'merge',
    })

  }

  filteredTasks(): Task[] {
    const allTasks = this.tasks()
    const currentFilter = this.filter()

    if (currentFilter === 'done') {
      return allTasks.filter(task => task.status === 'done')
    } else if (currentFilter === 'in-progress') {
      return allTasks.filter(task => task.status === 'in-progress')
    } else if (currentFilter === 'todo') {
      return allTasks.filter(task => task.status === 'todo')
    } else {
      return allTasks
    }

  }

  selectedTask(): Task | null {
    const id = this.selectedTaskId();
    if (id === null) return null;
    return this.tasks().find((t) => t.id === id) ?? null
  }

  handleTaskSelected(task: Task) {
    this.selectedTaskId.set(task.id)
  }

  handleTaskToggled(task: Task) {
    this.tasks.update((tasks) =>
      tasks.map((t) => {
        if (t.id !== task.id) return t;

        let nextStatus: Task['status'];
        switch (t.status) {
          case 'todo':
            nextStatus = 'in-progress'
            break;
          case 'in-progress':
            nextStatus = 'done'
            break;
          case 'done':
            nextStatus = 'todo'
            break;
        }
        return { ...t, status: nextStatus }
      }),
    )
  }

  handleTaskDelete(taskId: number ) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== taskId))

    if (this.selectedTaskId() === taskId) {
      this.selectedTaskId.set(null)
    }
  }

  handleTaskCreated(formValue: TaskFormValue) {
    const current = this.tasks()
    const maxId = current.length ? Math.max(...current.map((t) => t.id)) : 0;

    const newTask: Task = {
      id: maxId + 1,
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
    }
    this.tasks.update((tasks) => [newTask, ...tasks])

  }






























}
