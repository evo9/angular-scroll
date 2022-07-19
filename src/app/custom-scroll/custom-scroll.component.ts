import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-custom-scroll',
  templateUrl: './custom-scroll.component.html',
  styleUrls: ['./custom-scroll.component.scss'],
})
export class CustomScrollComponent implements OnInit, AfterViewInit {

  @ViewChild('viewport', { static: false }) viewport: ElementRef<HTMLDivElement>;
  @ViewChild('prevViewport', { static: false }) prevViewport: ElementRef<HTMLDivElement>;
  @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('listPrevItems') listPrevItems: QueryList<ElementRef<HTMLDivElement>>;

  public data = [];
  public prevItems = [];
  public sizes = [];
  private _viewportHeight: number;
  public _startIndex = 0;
  public _endIndex = 0;
  private _visibleRows = 0;

  public _rowHeight = 182;


  private _scrollTop = 0;
  private _scrollTimer: any;

  public containerHeight = 0;
  public containerTranslate = 0;
  public isScrollDisabled = false;
  private _direction: 'up' | 'down';
  private _isChangesDetectionEnabled = true;
  private _scrollContainer: any;
  private _oldHeight: number;

  constructor() { }

  public get items(): Array<any> {
    return this.data.slice(this._startIndex, this._endIndex);
  }

  public get viewportHeight(): number {
    const height = 0;
    return this.sizes.reduce((prev, current) => prev + current, height);

    //   return this._rowHeight * this._visibleRows + 1;
  }

  public get topHeight(): number {
    let height = 0;
    for (let i = 0; i < this._startIndex; i++) {
      height += this.sizes[i];
    }
    return height;

    // return  this.rowHeight * this._start;
  }

  public get bottomHeight(): number {
    let height = 0;

    for (let i = this._endIndex + 1; i < this.sizes.length; i++) {
      height += this.sizes[i];
    }
    return height;

    // return this._rowHeight * (this.data.length - (this._start + this._visibleRows + 1));
  }

  ngOnInit(): void {
    this.prevItems = generateItems(0, 20);
    this.data = [...this.prevItems];
    const timer = setInterval(() => {
      if (this.listPrevItems) {
        clearInterval(timer);

        this._setSizes();
        this._setScrollInfo(0);
      }
    }, 50);
  }

  ngAfterViewInit() {
    this._viewportHeight = this.viewport.nativeElement.offsetHeight;
  }

  public trackByIdFn(index: number, item): number {
    return item.id;
  }

  public onScroll(): void {
    const scrollTop = this.viewport.nativeElement.scrollTop;
    let totalSize = 0;
    let i = 0;

    while (totalSize <= scrollTop) {
      totalSize += this.sizes[i];
      i++;
    }

    this._setScrollInfo(i > 0 ? i - 1 : 0);

    // this._setScrollInfo(i);
    // console.log(this._startIndex, this._endIndex);

    // while (totalSize <= scrollTop) {
    //   totalSize += this.sizes[i];
    //   i++;
    // }
    // console.log(i, totalSize, scrollTop);
    //



    // this._start = Math.min(
    //   this.data.length - this._visibleRows - 1,
    //   Math.round(viewport.scrollTop / this._rowHeight)
    // );
    //
    // const scrollTop = viewport.scrollTop
    // if (this._scrollTop > scrollTop && scrollTop >= 10 && !this.isScrollDisabled) {
    //   console.log(this.isScrollDisabled, scrollTop);
    //   this.isScrollDisabled = true;
    //   this._prepend();
    // }
    //
    // this._scrollTop = scrollTop;


    // if (this.isScrollDisabled) {
    //   return;
    // }
    // const scrollTop = this._scrollContainer.scrollTop;
    // scrollTop > this._scrollTop ? this._onScrollDown() : this._onScrollUp();
    // this._scrollTop = scrollTop;
  }

  private _prepend(): void {
    const viewport = this.viewport.nativeElement;
    const scrollTop = viewport.scrollTop;
    const offsetHeight = viewport.offsetHeight;
    const items = generateItems(this.data.length);
    const diff = (offsetHeight + items.length * this._rowHeight) - offsetHeight;
    this.data = [...items, ...this.data];
    this._startIndex += items.length - 1;
    viewport.scrollTop = scrollTop + diff;
    this.isScrollDisabled = false;
  }

  private _setSizes(): void {
    this.listPrevItems.forEach(({ nativeElement }, index) => {
      const size = nativeElement.clientHeight;
      this.containerHeight += size;
      this.sizes.push(size);
    });
  }

  private _setScrollInfo(startIndex: number): void {
    let totalSize = 0;
    let index = startIndex;
    while (totalSize <= this._viewportHeight) {
      totalSize += this.sizes[index];
      index++;
    }

    this._startIndex = startIndex;
    this._endIndex = index + 1;
    this._visibleRows = this._endIndex - this._startIndex;
  }


  private _onScroll(e) {
  }

  private _onScrollUp(): void {
    this._direction = 'up';
    if (this._scrollTop <= 20) {
      // this.isScrollDisabled = true;
      this._oldHeight = this._scrollContainer.scrollHeight;
      // this.items = [...generateItems(this.items.length - 1, 10), ...this.items];
    }
  }

  private _onScrollDown(): void {
    // this._direction = 'down';
    // const position = this._scrollContainer.scrollTop + this._scrollContainer.offsetHeight;
    // const height = this._scrollContainer.scrollHeight;
    //
    // if (position > height - 50) {
    //   this.isScrollDisabled = true;
    //   this.items = [...this.items, ...generateItems(this.items.length - 1)];
    // }
  }

}
