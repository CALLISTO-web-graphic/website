import { Component, Input } from '@angular/core';

@Component({
  selector: 'callisto-logo',
  templateUrl: './callisto-logo.component.html',
  styleUrls: ['./callisto-logo.component.scss'],
})
export class CallistoLogoComponent {
  @Input() scale: string = '4rem';
  @Input() colors: Partial<{
    planetTop: string;
    planetBottom: string;
    ringRight: string;
    ringLeft: string;
    ringCenter: string;
    callisto: string;
  }> = {};
}
