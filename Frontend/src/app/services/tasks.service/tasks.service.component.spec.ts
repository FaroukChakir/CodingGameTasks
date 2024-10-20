import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksServiceComponent } from './tasks.service.component';

describe('TasksServiceComponent', () => {
  let component: TasksServiceComponent;
  let fixture: ComponentFixture<TasksServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
