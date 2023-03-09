import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallistoLogoComponent } from './components/callisto-logo/callisto-logo.component';
import { MouseArrowComponent } from './components/mouse-arrow/mouse-arrow.component';

@NgModule({
  declarations: [CallistoLogoComponent, MouseArrowComponent],
  imports: [CommonModule],
  exports: [CallistoLogoComponent, MouseArrowComponent],
})
export class SharedModule {}
