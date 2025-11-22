import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksApiService } from '../services/tasks-api-service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-detail-page',
  imports: [],
  templateUrl: './task-detail-page.html',
  styleUrl: './task-detail-page.scss',
})
export class TaskDetailPage implements OnInit {
private route = inject(ActivatedRoute)
private router = inject(Router)
private tasksApi = inject(TasksApiService)

//setting states with signals
readonly task = signal<Task | null >(null)
readonly isLoading = signal(false)
readonly error = signal<string | null>(null)

ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id')

  if(!idParam){
    this.error.set('No task id provided in the URL.')
    return
  }

  const id = Number(idParam)
  if(Number.isNaN(id)){
    this.error.set('Invalid task id.')
    return;
  }
this.loadTask(id)
}

private loadTask(id: number): void{
  this.isLoading.set(true)
  this.error.set(null)

  this.tasksApi.getTaskById(id).subscribe({
    next: (res) => {
      this.task.set(res)
      this.isLoading.set(false)
  },
  error: (err) => {
    console.error('Failed to load task', err)
    this.error.set('Failed to load task. It may not exist.')
    this.isLoading.set(false)
  },
  })
}

  goBack(): void{
    this.router.navigate(['/tasks'])
  }
















}
