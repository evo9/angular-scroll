import { Component, OnInit } from '@angular/core';

import { generateItems } from '../utils/app.util';
import { IPageInfo } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-ngx-virtual-scroller',
  templateUrl: './ngx-virtual-scroller.component.html',
  styleUrls: ['./ngx-virtual-scroller.component.scss'],
})
export class NgxVirtualScrollerComponent implements OnInit {

  public items = [];
  private _startIndex = 0;
  private _endIndex = 19;

  constructor() { }

  ngOnInit(): void {
    this.items = generateItems(0, 100);
  }

  public onScroll(event: IPageInfo): void {
    // const {startIndex, endIndex} = event;
    //
    // // console.log(endIndex, this._endIndex);
    //
    // if (this._startIndex > startIndex && startIndex === 2) {
    //   this.items = [...generateItems(this.items.length - 1), ...this.items];
    // }
    //
    // if (this._endIndex < endIndex && endIndex >= this.items.length - 3) {
    //   this.items = [...this.items, ...generateItems(this.items.length - 1)];
    // }
    //
    // this._startIndex = startIndex;
    // this._endIndex = endIndex;
  }

}
