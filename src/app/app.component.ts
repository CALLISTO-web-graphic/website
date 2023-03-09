import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as AOS from 'aos';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('content') content!: ElementRef;

  logoScale = 1;
  mouseOpacity = 1;
  logoOpacity = 1;

  public mouseAnim = new BehaviorSubject(1);
  public planetAnimMax = 100;
  public colorValues = ['#ffffff', '#a8a8a8'];

  constructor() {
    AOS.init();

    this.planetAnimationHandler('+');
  }

  public get _transformDeltas() {
    const scaleValues = {
      min: 0.9,
      max: 1,
    };

    const logoOpacity = {
      min: 0.5,
      max: 1,
    };

    const mouseOpacity = {
      min: 0,
      max: 1,
    };

    const planetAnim = {
      min: 0,
      max: 100,
    };

    return {
      scaleValues,
      logoOpacity,
      mouseOpacity,
      planetAnim,
    };
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: any) {
    const scrollHeight = (this.content.nativeElement as HTMLElement).scrollTop;

    const { scaleValues, logoOpacity, mouseOpacity } = this._transformDeltas;

    const step = 0.07;

    //depending on the value of deltaY, subtract a value from the scale (min 0.8, max 1) and subsequently the opacity (min 0, max 1)
    //if the user scrolls down (deltaY > 0), the scale and opacity should decrease
    //if the user scrolls up (deltaY < 0), the scale and opacity should increase

    //user is scrolling down
    if (event.deltaY > 0) {
      this.logoScale = this._updateValue(
        this.logoScale,
        scaleValues,
        step,
        '<'
      );

      this.logoOpacity = this._updateValue(
        this.logoOpacity,
        logoOpacity,
        step,
        '<'
      );

      this.mouseOpacity = this._updateValue(
        this.mouseOpacity,
        mouseOpacity,
        step,
        '<'
      );

      return;
    }

    //user is scrolling up
    if (event.deltaY < 0) {
      if (scrollHeight > 0) {
        return;
      }

      this.logoScale = this._updateValue(
        this.logoScale,
        scaleValues,
        step,
        '>'
      );

      this.logoOpacity = this._updateValue(
        this.logoOpacity,
        logoOpacity,
        step,
        '>'
      );

      this.mouseOpacity = this._updateValue(
        this.mouseOpacity,
        mouseOpacity,
        step,
        '>'
      );

      return;
    }
  }

  public planetAnimationHandler = (operator: '+' | '-', i = 1) => {
    //generate an increasing number between 0 and 100, push it to the mouseAnim subject
    //iif i > 100, clear the interval and restart the animation

    const interval = setInterval(() => {
      this.mouseAnim.next(i);

      switch (operator) {
        case '+':
          i++;
          break;
        case '-':
          i--;
          break;
      }

      if (i >= this._transformDeltas.planetAnim.max) {
        clearInterval(interval);
        //se "tocco" il massimo, inizio ad andare indietro
        this.planetAnimationHandler('-', i);
        return;
      }

      if (i <= this._transformDeltas.planetAnim.min + 1) {
        clearInterval(interval);
        // se "tocco" il minimo, inizio ad andare avanti
        this.planetAnimationHandler('+', i);
        return;
      }
    }, 20);
  };

  public coloreWheelGradient = (i: number) => {
    //based on the value of i (increments by 1 every n milliseconds), return a color in between colorValues[0] and colorValues[1]

    const color1 = this.colorValues[0];
    const color2 = this.colorValues[1];

    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);

    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    const r = Math.floor(r1 + (r2 - r1) * (i / 100));
    const g = Math.floor(g1 + (g2 - g1) * (i / 100));
    const b = Math.floor(b1 + (b2 - b1) * (i / 100));

    const rr =
      r.toString(16).length == 1 ? '0' + r.toString(16) : r.toString(16);
    const gg =
      g.toString(16).length == 1 ? '0' + g.toString(16) : g.toString(16);
    const bb =
      b.toString(16).length == 1 ? '0' + b.toString(16) : b.toString(16);

    return '#' + rr + gg + bb;
  };

  private _updateValue = (
    value: number,
    delta: {
      min: number;
      max: number;
    },
    step: number,
    operator: '<' | '>'
  ) => {
    switch (operator) {
      case '<':
        return value < delta.min ? value : value - step;

      case '>':
        return value > delta.max ? value : value + step;
    }
  };
}
