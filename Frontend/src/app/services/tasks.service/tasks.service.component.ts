import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {GetTasksDto} from '../../models/GetTasksDto'
import { DeleteTaskDto } from '../../models/DeleteTaskDto';
import { EditTaskDto } from '../../models/EditTaskDto';
import { AddTaskDto } from '../../models/AddTaskDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // This makes the service available throughout the app
})

export class TasksServiceComponent {
  GetTasksUrl = "TasksManagement/GetTasks";
  EditTasksUrl = "TasksManagement/EditTask";
  DeleteTasksUrl = "TasksManagement/DeleteTask";
  AddTaskUrl = "TasksManagement/CreateTask";

  constructor(private http:HttpClient){}

  public GetTasks(pageNumber: number, itemsPerPage: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.GetTasksUrl}?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);
}

  public AddTask(task: AddTaskDto): Observable<AddTaskDto> {
    return this.http.post<AddTaskDto>(`${environment.apiUrl}/${this.AddTaskUrl}`, task);
  }

  public EditTask(task:EditTaskDto):Observable<EditTaskDto>
  {
    return this.http.post<EditTaskDto>(`${environment.apiUrl}/${this.EditTasksUrl}`,task);
  }

  public DeleteTask(task:DeleteTaskDto):Observable<DeleteTaskDto>
  {
    return this.http.post<DeleteTaskDto>(`${environment.apiUrl}/${this.DeleteTasksUrl}`,task);
  }
}