import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewsPage } from './addnews.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewsPageRoutingModule {}
