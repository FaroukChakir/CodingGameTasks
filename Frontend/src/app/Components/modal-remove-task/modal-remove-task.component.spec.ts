import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveTaskComponent } from './modal-remove-task.component';

describe('ModalRemoveTaskComponent', () => {
  let component: ModalRemoveTaskComponent;
  let fixture: ComponentFixture<ModalRemoveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRemoveTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRemoveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
