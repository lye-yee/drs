import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddvouPage } from './addvou.page';

const routes: Routes = [
  {
    path: '',
    component: AddvouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddvouPageRoutingModule {}
