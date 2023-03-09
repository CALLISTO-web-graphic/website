import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'callisto-mouse-arrow',
  templateUrl: './mouse-arrow.component.html',
  styleUrls: ['./mouse-arrow.component.scss'],
})
export class MouseArrowComponent implements OnInit {
  @Input() arrowRotation = 180;

  public mouseScale = '6rem';
  public arrowScale = '2rem';

  constructor() {}

  ngOnInit(): void {}
}
