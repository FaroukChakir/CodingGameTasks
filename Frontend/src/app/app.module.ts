import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksListingComponent } from './Components/tasks-listing/tasks-listing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddTaskComponent } from './Components/modal-add-task/modal-add-task.component';
import { ModalUpdateTaskComponent } from './Components/modal-update-task/modal-update-task.component';
import { ModalRemoveTaskComponent } from './Components/modal-remove-task/modal-remove-task.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TasksListingComponent,
    ModalUpdateTaskComponent,
    ModalRemoveTaskComponent,
    ModalAddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
