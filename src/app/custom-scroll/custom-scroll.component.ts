import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  NgZone,
  Renderer2
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { generateItems } from '../utils/app.util';

@UntilDestroy()
@Component({
  selector: 'app-custom-scroll',
  templateUrl: './custom-scroll.component.html',
  styleUrls: ['./custom-scroll.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomScrollComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: false }) containerElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('viewport', { static: false }) viewportElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('spacer', { static: false }) spacerElementRef: ElementRef<HTMLDivElement>;
  @ViewChildren('items') listItems: QueryList<ElementRef<HTMLDivElement>>;

  public items: Array<any> = [];
  private _items: Array<any> = [];
  private _cachedItems: Array<any> = [];
  private _container: any;
  private _viewport: any;
  private _spacer: any;
  private _containerHeight = 0;
  private _viewportHeight = 0;
  private _startIndex = 0;
  private _endIndex = 0;
  private translateY = 0;
  private _scrollHeight = 0;
  private _observer: any;
  private _stopIntersection = false;

  constructor(
    private _zone: NgZone,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this._items = generateItems(0, 20);

    // setTimeout(() => {
    //   this._endIndex = this._items.length - 1;
    //   this._setItems();
    // }, 1);
  }

  ngAfterViewInit() {
    this._container = this.containerElementRef.nativeElement;
    this._viewport = this.viewportElementRef.nativeElement;
    this._spacer = this.spacerElementRef.nativeElement;

    setTimeout(() => {
      this._renderer.setStyle(this._viewport, 'height', `5000px`);
      this._container.scrollTop = 1000;
      this._renderer.setStyle(this._spacer, 'transform', `translateY(1000px)`);
      this.items = [...this._items];

      setTimeout(() => {
        this.items = [...generateItems(this.items.length, 20), ...this.items];
      }, 5000);
    });

    // this._containerHeight = this._container.clientHeight;
    //
    // const sub = this.listItems.changes.subscribe(() => {
    //   this._calculateViewport();
    //   sub.unsubscribe();
    // });
  }

  public onScroll(): void {
    // const scrollTop = this._container.scrollTop;
    // // const diff = scrollTop - (this.translateY + this.items[0].size);
    // //
    // // console.log(diff);
    // if (scrollTop > this.items[0].height) {
    //   this._startIndex++;
    //   this._endIndex++;
    //   this._setItems();
    // }
  }

  private _setItems(): void {
    this.items = this._items.slice(this._startIndex, this._endIndex);
  }

  private _calculateViewport(): void {
    let endIndex = null;
    this.listItems.forEach(({ nativeElement }, index) => {
      const height = nativeElement.clientHeight;
      this._items[index].height = height;
      this._viewportHeight += height;

      if (endIndex === null && this._viewportHeight > this._containerHeight) {
        endIndex = index;
      }
    });

    this._renderer.setStyle(this._viewport, 'height', `${this._viewportHeight}px`);
    this._renderer.setStyle(this._spacer, 'transform', `translateY(${this.translateY}px)`);

    if (endIndex) {
      setTimeout(() => {
        this._endIndex = endIndex + 1;
        this._setItems();
      }, 1);
    }
  }

  /*intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this._observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!this._stopIntersection) {
          // const items = generateItems(this.items.length, 20);
          // this.items = [...items, ...this.items];
          // console.log(this.items.length);
          // this._stopIntersection = true;
        }
      }
    }, options);
  }*/

  // @ViewChild('viewport', { static: false }) viewport: ElementRef<HTMLDivElement>;
  // @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>;
  // @ViewChildren('listItemsMeter') listItemsMeter: QueryList<ElementRef<HTMLDivElement>>;
  //
  // public items = [];
  // public itemsMeter = [];
  // public sizes = [];
  // private _viewportHeight: number;
  // private _startIndex = 0;
  // private _endIndex = 0;
  // private _maxIndex = 0;
  // private _firstVisible = 0;
  // private _lastVisible = 0;
  // private _visibleRows = 0;
  // private _scrollTop = 0;
  // private _scrollEventEnabled = true;
  // private _currentScrollTop = 0;
  //
  // private _totalSize = 0;
  //
  // constructor(private _cdr: ChangeDetectorRef) { }
  //
  // public get viewportItems(): Array<any> {
  //   return this.items.slice(this._startIndex, this._endIndex);
  // }
  //
  // public get topHeight(): number {
  //   let height = 0;
  //   for (let i = 0; i < this._startIndex; i++) {
  //     height += this.items[i].size;
  //   }
  //   return height;
  // }
  //
  // public get bottomHeight(): number {
  //   let height = 0;
  //
  //   for (let i = this._endIndex + 1; i < this.items.length; i++) {
  //     height += this.items[i].size;
  //   }
  //   return height;
  // }
  //
  // ngOnInit(): void {
  //   this.itemsMeter = generateItems(0, 20);
  //  /* const timer = setInterval(() => {
  //     if (this.listItemsMeter) {
  //       clearInterval(timer);
  //
  //       this._initItems();
  //       this._setScrollInfo(0);
  //
  //       // this.listItemsMeter.changes.pipe(
  //       //   untilDestroyed(this)
  //       // ).subscribe(() => {
  //       //   if (!this.listItemsMeter.length) {
  //       //     return;
  //       //   }
  //       //
  //       //   const items = [];
  //       //   let totalSize = 0;
  //       //   this.listItemsMeter.forEach(({ nativeElement }, index) => {
  //       //     const size = nativeElement.clientHeight;
  //       //     totalSize += size;
  //       //
  //       //     items.push({
  //       //       id: index,
  //       //       data: this.itemsMeter[index],
  //       //       size
  //       //     });
  //       //   });
  //       //
  //       //   this.itemsMeter = [];
  //       //   this.items = [...items, ...this.items].map((item, i) => ({
  //       //     ...item,
  //       //     id: i
  //       //   }));
  //       //   this._startIndex += items.length;
  //       //   this._endIndex = this._startIndex + this._visibleRows;
  //       //   this._maxIndex += items.length;
  //       //
  //       //   setTimeout(() => {
  //       //     this.viewport.nativeElement.scrollTop = this._currentScrollTop + totalSize;
  //       //     this._scrollEventEnabled = true;
  //       //   }, 10);
  //       // });
  //       //
  //       // this.listItems.changes.pipe(
  //       //   untilDestroyed(this)
  //       // ).subscribe(() => {
  //       //   console.log(this._startIndex)
  //       // });
  //     }
  //   }, 50);*/
  // }
  //
  // ngAfterContentInit() {
  //   console.log('after content init');
  //   this.listItemsMeter.changes.pipe(
  //     untilDestroyed(this)
  //   ).subscribe(() => {
  //     console.log(23342);
  //     this._initItems();
  //     this._setScrollInfo(0);
  //   });
  // }
  //
  // ngAfterViewInit() {
  //   this._viewportHeight = this.viewport.nativeElement.offsetHeight;
  //   console.log('after view init');
  // }
  //
  // ngAfterViewChecked() {
  //   console.log('after view checked');
  //
  // }
  //
  // public trackByIdFn(index: number, item): number {
  //   return item.id;
  // }
  //
  // public onScroll(): void {
  //   const scrollTop = this.viewport.nativeElement.scrollTop;
  //   let totalSize = 0;
  //   let i = 0;
  //
  //   while (totalSize <= scrollTop) {
  //     totalSize += this.items[i].size;
  //     i++;
  //   }
  //
  //   this._setScrollInfo(i > 0 ? i - 1 : 0);
  //
  //   if (this._scrollEventEnabled) {
  //     if (this._scrollTop > scrollTop && this._startIndex === 0) {
  //       this._scrollEventEnabled = false;
  //       this._onScrollUp();
  //     }
  //     if (this._scrollTop < scrollTop && this._endIndex === this._maxIndex) {
  //       this._scrollEventEnabled = false;
  //       this._onScrollDown();
  //     }
  //   }
  //
  //   this._scrollTop = scrollTop;
  // }
  //
  // private _initItems(): void {
  //   this.listItemsMeter.forEach(({ nativeElement }, index) => {
  //     const size = nativeElement.clientHeight;
  //
  //     this.items.push({
  //       id: index,
  //       data: this.itemsMeter[index],
  //       size
  //     });
  //   });
  //
  //   this.itemsMeter = [];
  //   this._maxIndex = this.items.length - 1;
  // }
  //
  // private _setScrollInfo(startIndex: number): void {
  //   let totalSize = 0;
  //   let i = startIndex;
  //   while (totalSize <= this._viewportHeight) {
  //     totalSize += this.items[i].size;
  //     i++;
  //   }
  //
  //   const endIndex = i + 1;
  //
  //   this._startIndex = startIndex;
  //   this._endIndex = endIndex > this._maxIndex ? this._maxIndex : endIndex;
  //   this._visibleRows = this._endIndex - this._startIndex;
  // }
  //
  // private _prepend(): void {
  //   this._currentScrollTop = this.viewport.nativeElement.scrollTop;
  //   this.itemsMeter = generateItems(this.items.length);
  //
  //
  //   // const diff = (offsetHeight + viewportItems.length * this._rowHeight) - offsetHeight;
  //   // this.items = [...viewportItems, ...this.items];
  //   // this._startIndex += viewportItems.length - 1;
  //   // viewport.scrollTop = scrollTop + diff;
  //   // this.isScrollDisabled = false;
  // }
  //
  // private _setLastVisible(): void {
  //   const scrollTop = this.viewport.nativeElement.scrollTop;
  //   const lastItem = this.viewportItems.slice(-1);
  //
  //   // let totalSize = 0;
  //   // let i = 0;
  //   //
  //   // while (totalSize <= scrollTop) {
  //   //   totalSize += this.sizes[i];
  //   // }
  // }
  //
  //
  // private _onScrollUp(): void {
  //   console.log('scrolled up');
  //   this._prepend();
  //   setTimeout(() => {
  //
  //   }, 1000);
  // }
  //
  // private _onScrollDown(): void {
  //   console.log('scrolled down');
  //   setTimeout(() => {
  //     this._scrollEventEnabled = true;
  //   }, 1000);
  // }

}
