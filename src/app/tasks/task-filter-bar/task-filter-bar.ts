import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter-bar',
  imports: [],
  templateUrl: './task-filter-bar.html',
  styleUrl: './task-filter-bar.scss',
})
export class TaskFilterBar {
@Input({required: true}) currentFilter: 'all' | 'done' | 'in-progress' | 'todo' = 'all'

@Output() filterChange = new EventEmitter<'all' | 'done' | 'in-progress' | 'todo' >()

setFilter(filter: 'all' | 'done' | 'in-progress' | 'todo' ){
  this.filterChange.emit(filter)
}






























}
