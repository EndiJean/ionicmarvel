import { LoadingComponent } from './../util/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomePage, LoadingComponent],
  exports: [LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicStorageModule.forRoot()
  ]
})
  export class HomePageModule {}
