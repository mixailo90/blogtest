import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from "./blog.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
