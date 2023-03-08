import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallistoLogoComponent } from './components/callisto-logo/callisto-logo.component';



@NgModule({
  declarations: [
    CallistoLogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CallistoLogoComponent
  ]
})
export class SharedModule { }
