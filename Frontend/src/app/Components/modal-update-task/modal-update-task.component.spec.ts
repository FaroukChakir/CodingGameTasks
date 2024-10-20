import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateTaskComponent } from './modal-update-task.component';

describe('ModalUpdateTaskComponent', () => {
  let component: ModalUpdateTaskComponent;
  let fixture: ComponentFixture<ModalUpdateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
