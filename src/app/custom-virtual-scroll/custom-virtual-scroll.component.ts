import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  Renderer2,
  NgZone,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { generateItems } from '../utils/app.util';

@UntilDestroy()
@Component({
  selector: 'app-custom-virtual-scroll',
  templateUrl: './custom-virtual-scroll.component.html',
  styleUrls: ['./custom-virtual-scroll.component.scss'],
})
export class CustomVirtualScrollComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('viewport', { static: false }) viewportElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainerElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('scrollSpacer', { static: false }) scrollSpacerElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('topSpacer', { static: false }) topSpacerElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('bottomSpacer', { static: false }) bottomSpacerElementRef: ElementRef<HTMLDivElement>;
  @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>;

  public prevItems: Array<any> = [];
  public items: Array<any> = [];

  private _cachedItems: Array<any> = [];
  private _isInitItems = true;
  private _viewportHeight = 0;
  private _totalHeight = 0;
  private _startIndex = 0;
  private _endIndex = 0;
  private _maxIndex = 0;
  private _scrollEventEnabled = true;
  private _scrollTop = 0;
  private _oldScrollTop = 0;
  private _direction: 'up' | 'down' = 'down';
  private _scrollHandler: any;
  private _transform = 0;

  constructor(
    private _renderer: Renderer2,
    private _zone: NgZone,
    private _element: ElementRef,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._initItems();
    }, 1);
  }

  ngOnDestroy() {
    this._removeScrollEventListeners();
  }

  ngAfterViewInit() {
    this._addScrollEventListeners();
    const scrollContainer = this.scrollContainerElementRef.nativeElement;
    this._viewportHeight = this.viewportElementRef.nativeElement.clientHeight;
    this._renderer.setStyle(scrollContainer, 'minHeight', `${this._viewportHeight}px`);

    this.listItems.changes.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      const length = this.listItems.length;
      if (length > 0) {
        this._calculateItemSizes();
        if (this._isInitItems) {
          this._initViewport();
          return;
        }

        if (this._direction === 'up') {
          this._calculateScrollIndexes(length);
          const scrollTop = this._transform + this._oldScrollTop/* - this._cachedItems[length].height*/;
          // console.log(scrollTop, this._cachedItems[length].height);
          this.viewportElementRef.nativeElement.scrollTop = scrollTop;
          setTimeout(() => {
            this._scrollEventEnabled = true;
          }, 100);
        }
      }
    });
  }

  public trackByIdFn(index: number, item): number {
    return item.id;
  }

  public onScroll(): void {
    const scrollTop = this.viewportElementRef.nativeElement.scrollTop;
    this._direction = this._scrollTop > scrollTop ? 'up' : 'down';

    if (this._scrollEventEnabled) {
      let totalHeight = 0;
      let startIndex = 0;
      for (let i = 0; i < this._cachedItems.length; i++) {
        if (totalHeight > scrollTop) {
          break;
        }

        startIndex = i;
        totalHeight += this._cachedItems[i].height;
      }

      this._calculateScrollIndexes(startIndex);

      if (this._direction === 'up' && this._startIndex === 0) {
        this._scrollEventEnabled = false;
        this._onScrollUp();
      }
      if (this._direction === 'down' && this._endIndex === this._maxIndex - 1) {
        this._scrollEventEnabled = false;
        this._onScrollDown();
      }
    }

    this._scrollTop = scrollTop;
  }

  private _initItems(index = 0, count = 20): void {
    this.prevItems = generateItems(index, count);
  }

  private _setItems(): void {
    this.items = this._cachedItems.slice(this._startIndex, this._endIndex);
    this._cdr.detectChanges();
  }

  private _calculateItemSizes(): void {
    this.listItems.forEach(({ nativeElement }, index) => {
      const height = nativeElement.clientHeight;
      this._totalHeight += height;

      const action = this._direction === 'up' ? 'unshift' : 'push';
      this._cachedItems[action]({
        data: this.prevItems[index],
        totalHeight: this._totalHeight,
        height,
      });
    });

    this._renderer.setStyle(this.scrollSpacerElementRef.nativeElement, 'transform', `scaleY(${this._totalHeight})`)
    this._maxIndex = this._cachedItems.length - 1;

    setTimeout(() => {
      this.prevItems = [];
      this._cdr.detectChanges();
    }, 1);
  }

  private _calculateScrollIndexes(startIndex = 0): void {
    let totalHeight = 0;
    let i = startIndex;
    while (totalHeight <= this._viewportHeight) {
      totalHeight += this._cachedItems[i].height;
      i++;
    }

    const endIndex = i + 1;
    if (startIndex > 0) {
      startIndex--;
    }
    this._startIndex = startIndex;
    this._endIndex = endIndex > this._maxIndex ? this._maxIndex + 1 : endIndex;

    this._setItems();
    this._setTransform(startIndex);
  }

  private _initViewport(): void {
    setTimeout(() => {
      this._calculateScrollIndexes();
      this._isInitItems = false;
    }, 1);
  }

  private _onScrollUp(): void {
    console.log('scrolled up');
    this._prependItems();
  }

  private _onScrollDown(): void {
    console.log('scrolled down');
    setTimeout(() => {
      this._scrollEventEnabled = true;
    }, 500);
  }

  private _prependItems(): void {
    this.prevItems = generateItems(this._cachedItems.length, 10);
    this._cdr.detectChanges();
  }

  private _addScrollEventListeners(): void {
    this._zone.runOutsideAngular(() => {
      this._scrollHandler = this._renderer.listen(this.viewportElementRef.nativeElement, 'scroll', () => {
        this.onScroll();
      })
    });
  }

  private _removeScrollEventListeners(): void {
    this._scrollHandler = undefined;
  }

  private _setTransform(startIndex: number): void {
    this._oldScrollTop = this.viewportElementRef.nativeElement.scrollTop;
    let transform = 0;
    for (let i = 0; i < startIndex; i++) {
      transform += this._cachedItems[i].height;
    }
    this._transform = transform;
    this._renderer.setStyle(this.scrollContainerElementRef.nativeElement, 'transform', `translateY(${transform}px)`);
  }
}
