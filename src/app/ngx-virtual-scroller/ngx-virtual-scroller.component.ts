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

  constructor() { }

  ngOnInit(): void {
    this.items = generateItems(0, 20);
  }

  public onScroll(event: IPageInfo): void {
    console.log(event);
  }

}
