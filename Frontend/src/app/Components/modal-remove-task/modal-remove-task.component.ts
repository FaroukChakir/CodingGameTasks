import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GetTasksDto } from '../../models/GetTasksDto';
import { DeleteTaskDto } from '../../models/DeleteTaskDto';
import { TasksServiceComponent } from '../../services/tasks.service/tasks.service.component';

@Component({
  selector: 'app-modal-remove-task',
  templateUrl: './modal-remove-task.component.html',
  styleUrls: ['./modal-remove-task.component.css']
})
export class ModalRemoveTaskComponent {
  // Input property for modal title
  @Input() title: string = '';
  @Output() taskOndeleteEmit: EventEmitter<{ success: boolean; message: string }> = new EventEmitter();

  // Task properties for modal display
  description: string = '';
  date: string = '';
  status: string = '';
  isOpen = false;
  TaskonDeleteID: string = ''; 

  constructor(private tasksService: TasksServiceComponent) {}

  // Open the modal and populate task data
  open(task: GetTasksDto) {
    this.description = task.description;
    this.date = this.formatDate(task.date);
    this.status = task.status ? 'Open' : 'Closed';
    this.TaskonDeleteID = task.ticketID;
    this.isOpen = true;
  }

  // Close the modal and reset fields
  close() {
    this.isOpen = false;
    this.resetFields();
  }

  // Confirm the task deletion
  confirm() {
    this.deleteTask(); // Call the task deletion method
    this.close(); // Close the modal after action
  }

  // Perform the task deletion action
  deleteTask() {
    const taskonDeleteDTO = new DeleteTaskDto(this.TaskonDeleteID);

    this.tasksService.DeleteTask(taskonDeleteDTO).subscribe(
      () => {
        this.taskOndeleteEmit.emit({ success: true, message: 'Task Deleted successfully!' });
      },
      () => {
        this.taskOndeleteEmit.emit({ success: false, message: 'Error Deleting task. Please try again.' });
      }
    );
  }

  // Reset fields in the modal
  resetFields() {
    this.description = '';
    this.date = '';
    this.status = '';
  }

  // Format date to YYYY-MM-DD format
  private formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
