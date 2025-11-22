import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { JsonPlaceholderTodo, Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private http = inject(HttpClient)

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTasks(): Observable<Task[]> {
    return this.http
      .get<JsonPlaceholderTodo[]>(this.apiUrl, {
        params: { _limit: 5 }, // only 5 items for demo
      })
      .pipe(map((res) => res.map((todo) => this.mapTodoToTask(todo))));
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<JsonPlaceholderTodo>(`${this.apiUrl}/${id}`).pipe(map((res)=> this.mapTodoToTask(res)))
  }

  private mapTodoToTask(todo: JsonPlaceholderTodo): Task {
    const status: TaskStatus = todo.completed ? 'done' : 'todo'
    return {
      id: todo.id,
      title: todo.title,
      description: `Imported from JSONPlaceholder (user ${todo.userId})`,
      status,
    }
  }







}
