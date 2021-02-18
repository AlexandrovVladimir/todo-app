import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoContainerComponent } from "./container/todo-container/todo-container.component";

const routes: Routes = [
  {
    path: '',
    component: TodoContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
