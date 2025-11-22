import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskFormValue, TaskStatus } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
readonly taskCreated = output<TaskFormValue>()

readonly form: FormGroup;

constructor(private fb: FormBuilder){
  this.form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: ['todo' as TaskStatus, [Validators.required]]
  })
}

get title(){
  return this.form.get('title')
}

get description(){
  return this.form.get('description')
}

get status(){
  return this.form.get('status')
}

submit(){
  if(this.form.invalid){
    this.form.markAllAsTouched()
    return;
  }

  const value = this.form.value as TaskFormValue
  // const value: TaskFormValue = this.form.value

  this.taskCreated.emit(value)

  this.form.reset({
    title: '',
    description: '',
    status: 'todo'
  })

}


















}
