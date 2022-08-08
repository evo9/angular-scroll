import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  SimpleChanges, AfterViewInit,
} from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-ngx-perfect-scrollbar',
  templateUrl: './ngx-perfect-scrollbar.component.html',
  styleUrls: ['./ngx-perfect-scrollbar.component.scss'],
})
export class NgxPerfectScrollbarComponent implements OnInit, OnChanges, AfterViewInit {


  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>;

  public config = {};
  public items = [];
  public isDisabled = false;
  private _scrollTimer: any;
  private _isInit = true;
  private _position: any;

  constructor() { }

  ngOnInit(): void {
    this.items = generateItems(0, 20);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onClick(): void {
    const items = [...generateItems(20), ...this.items];
    // viewportItems.splice(-10);
    this.items = [...items];
    // this.isDisabled = true;
    // this._position = this.directiveRef.position(true);
    // console.log(this._position)
  }

  public onScrollUp(event: any): void {
    if (this._isInit) {
      this._isInit = false;
      return;
    }

    console.log('scroll up');
    this.items = [...generateItems(20), ...this.items];

    // console.log(23423)
    // generateItems(20).forEach(item => {
    //   this.viewportItems.push(item);
    // })
    // this.ps.directiveRef.update();
    // if (this._scrollTimer) {
    //   clearTimeout(this._scrollTimer);
    // }
    //
    // this._scrollTimer = setTimeout(() => {
    //   console.log(event);
    //
    // }, 500);

  }

  public onScrollDown(event: any): void {

  }

}
