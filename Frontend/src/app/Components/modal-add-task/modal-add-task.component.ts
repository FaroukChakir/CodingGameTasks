import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AddTaskDto } from '../../models/AddTaskDto';
import { TasksServiceComponent } from '../../services/tasks.service/tasks.service.component';

@Component({
  selector: 'app-modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.css']
})
export class ModalAddTaskComponent implements OnInit {
  // Input property for the modal title
  @Input() title: string = '';

  // Output event to emit task creation result
  @Output() taskAdded: EventEmitter<{ success: boolean; message: string }> = new EventEmitter();

  // Modal control variables
  isOpen = false;
  Status: string[] = []; // Status options
  description: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';
  showErrorMessages: boolean = false; // Show validation errors
  response: string = ''; // Response message from the server

  constructor(private tasksService: TasksServiceComponent) {}

  // Initialize status options on component load
  ngOnInit(): void {
    this.loadSampleTasks();
  }

  // Load sample status values (Open, Closed)
  loadSampleTasks(): void {
    this.Status = ['Open', 'Closed'];
  }

  // Open the modal and reset the form
  open() {
    this.isOpen = true;
    this.resetForm(); 
  }

  // Close the modal and reset the form
  close() {
    this.isOpen = false;
    this.resetForm();
  }

  // Reset the form fields
  resetForm() {
    this.description = '';
    this.selectedStatus = '';
    this.selectedDate = '';
    this.showErrorMessages = false;
  }

  // Create a new task and handle the API response
  createTask() {
    const newTask = new AddTaskDto(this.description, this.selectedStatus === 'Open', new Date(this.selectedDate));
    
    // Call the task creation service
    this.tasksService.AddTask(newTask).subscribe(
      () => {
        this.taskAdded.emit({ success: true, message: 'Task Created successfully!' });
        this.close(); // Close the modal on success
      },
      () => {
        this.taskAdded.emit({ success: false, message: 'Error Creating task. Please try again.' });
      }
    );
  }

  // Validate the form and submit the task
  confirm(taskForm: any) {
    this.showErrorMessages = true;
    
    // Check if form is valid before submitting
    if (taskForm.valid) {
      this.createTask();
    } else {
      alert("Please fill in all required fields.");
    }
  }
}
