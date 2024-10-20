import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { GetTasksDto } from '../../models/GetTasksDto';
import { ModalAddTaskComponent } from '../modal-add-task/modal-add-task.component';
import { TasksServiceComponent } from '../../services/tasks.service/tasks.service.component';
import { ModalRemoveTaskComponent } from '../modal-remove-task/modal-remove-task.component';
import { ModalUpdateTaskComponent } from '../modal-update-task/modal-update-task.component';

@Component({
  selector: 'app-tasks-listing',
  templateUrl: './tasks-listing.component.html',
  styleUrls: ['./tasks-listing.component.css']
})
export class TasksListingComponent implements OnInit {
  @ViewChild('AddTaskmodal') addTaskModal!: ModalAddTaskComponent;
  @ViewChild('RemoveTaskmodal') removeTaskModal!: ModalRemoveTaskComponent;
  @ViewChild('UpdateTaskmodal') updateTaskModal!: ModalUpdateTaskComponent;


  tasks: GetTasksDto[] = [];
  RemovemodalTitle: string = "Delete Task";
  AddmodalTitle: string = "Add Task";
  UpdatemodalTitle: string = "Update Task";
  successMessage: string = '';
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private tasksService: TasksServiceComponent) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Reload the Table on Create / Update / Delete
  onTasksListUpdate(event: { success: boolean; message: string }) {
    if (event.success) {
      alert(event.message);
      this.loadTasks();
    } else {
      alert(event.message);
    }
  }

  // Function to load tasks with pagination
  loadTasks() {
    this.tasksService.GetTasks(this.currentPage, this.itemsPerPage).subscribe(response => {
      this.tasks = response.tasks.map((task: any) => new GetTasksDto(
        task.ticketID,
        task.description,
        task.status,
        task.date
      ));
      this.totalItems = response.totalCount;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  // Change Page
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTasks();
    }
  }

  // Returns Month Name Based on Number 
  getMonthName(date: Date): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[new Date(date).getMonth()];
  }

  onTaskDeleted() {
    this.loadTasks(); 
  }
}
