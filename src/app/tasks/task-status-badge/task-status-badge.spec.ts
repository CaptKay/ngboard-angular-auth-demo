import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusBadge } from './task-status-badge';

describe('TaskStatusBadge', () => {
  let component: TaskStatusBadge;
  let fixture: ComponentFixture<TaskStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
