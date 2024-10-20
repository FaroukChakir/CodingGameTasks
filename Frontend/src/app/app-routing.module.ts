import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListingComponent } from './Components/tasks-listing/tasks-listing.component';
const routes: Routes = [
  {path:'', component:TasksListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
