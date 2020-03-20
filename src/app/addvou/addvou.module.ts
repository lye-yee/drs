import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddvouPageRoutingModule } from './addvou-routing.module';

import { AddvouPage } from './addvou.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddvouPageRoutingModule
  ],
  declarations: [AddvouPage]
})
export class AddvouPageModule {}
