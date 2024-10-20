import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GetTasksDto } from '../../models/GetTasksDto';
import { TasksServiceComponent } from '../../services/tasks.service/tasks.service.component';
import { EditTaskDto } from '../../models/EditTaskDto';

@Component({
  selector: 'app-modal-update-task',
  templateUrl: './modal-update-task.component.html',
  styleUrls: ['./modal-update-task.component.css']
})
export class ModalUpdateTaskComponent {
  @Input() title: string = '';
  isOpen = false;
  Status: string[] = ['Open', 'Closed'];
  
  // Current task properties
  currentStatusBoolVal: boolean = false;
  currentDescription: string = '';
  currentDateStrVal: string = '';
  currentDateDateVal: Date = new Date();
  currentStatusStrVal: string = '';
  currenttaskID: string = '';
  error: string = '';

  @Output() taskOnUpdate: EventEmitter<{ success: boolean; message: string }> = new EventEmitter();

  constructor(private tasksService: TasksServiceComponent) {}

  // Open the modal and populate task details
  open(task: GetTasksDto) {
    this.currenttaskID = task.ticketID;
    this.currentDescription = task.description;
    this.currentStatusBoolVal = task.status;
    this.currentDateDateVal = task.date;
    this.currentDateStrVal = this.formatDate(task.date);
    this.currentStatusStrVal = task.status ? 'Open' : 'Closed';
    this.isOpen = true;
  }

  // Close the modal and reset the form
  close() {
    this.isOpen = false;
    this.resetForm();
  }

  // Reset form to clear old data
  resetForm() {
    this.currentDescription = '';
    this.currentDateStrVal = '';
    this.currentStatusStrVal = '';
    this.currenttaskID = '';
    this.error = '';
  }

  // Update the task with the new data using the services
  UpdateTask() {
    this.currentStatusBoolVal = this.currentStatusStrVal === 'Open';
    this.currentDateDateVal = new Date(this.currentDateStrVal);

    const updatedTask = new EditTaskDto(
      this.currenttaskID,
      this.currentDescription,
      this.currentStatusBoolVal,
      this.currentDateDateVal
    );

    this.tasksService.EditTask(updatedTask).subscribe(
      () => {
        this.taskOnUpdate.emit({ success: true, message: 'Task updated successfully!' });
        this.close();
      },
      () => {
        this.taskOnUpdate.emit({ success: false, message: 'Error updating task. Please try again.' });
      }
    );
  }

  // Confirm and trigger update
  confirm() {
    if (this.currentDescription && this.currentDateStrVal && this.currentStatusStrVal) {
      this.UpdateTask();
    } else {
      this.error = 'Please fill in all fields.';
    }
  }

  // Format the date to YYYY-MM-DD
  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
