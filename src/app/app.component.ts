import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('content') content!: ElementRef;

  logoScale = 1;
  logoOpacity = 1;

  constructor() {
    AOS.init();
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: any) {
    const scrollHeight = (this.content.nativeElement as HTMLElement).scrollTop;

    // console.log(`scale: ${this.logoScale}, opacity: ${this.logoOpacity}`);
    const scaleValues = {
      min: 0.9,
      max: 1,
    };

    const opacityValues = {
      min: 0,
      max: 1,
    };

    const step = 0.07;

    //depending on the value of deltaY, subtract a value from the scale (min 0.8, max 1) and subsequently the opacity (min 0, max 1)
    //if the user scrolls down (deltaY > 0), the scale and opacity should decrease
    //if the user scrolls up (deltaY < 0), the scale and opacity should increase

    //user is scrolling down
    if (event.deltaY > 0) {
      this.logoScale =
        this.logoScale < scaleValues.min
          ? this.logoScale
          : this.logoScale - step;

      this.logoOpacity =
        this.logoOpacity < opacityValues.min
          ? this.logoOpacity
          : this.logoOpacity - step;

      return;
    }

    //user is scrolling up
    if (event.deltaY < 0) {
      if (scrollHeight > 0) {
        return;
      }

      this.logoScale =
        this.logoScale > scaleValues.max
          ? this.logoScale
          : this.logoScale + step;

      this.logoOpacity =
        this.logoOpacity > opacityValues.max
          ? this.logoOpacity
          : this.logoOpacity + step;

      return;
    }
  }
}
