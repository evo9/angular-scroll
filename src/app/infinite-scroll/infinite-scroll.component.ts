import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { ScrollDirective } from '../directives/scroll.directive';
import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  viewProviders: [ScrollDirective],
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit {

  @ViewChild(ScrollDirective) scrollDirective: ScrollDirective;
  @ViewChild('viewport') viewport: ElementRef<HTMLDivElement>;
  @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>;

  public items = [];
  private _getItems = new EventEmitter<any>();
  private _viewport: any;
  private _scrollTop: number;
  private _scrollHeight: number;
  private _direction: 'up' | 'down';

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this._getItems.subscribe(items => {
        this.items = items;
      });

      this._getItems.emit(generateItems(0, 30));
    }, 500);
  }

  ngAfterViewInit() {
    this._viewport = this.viewport.nativeElement;

    this.listItems.changes.subscribe(() => {
      // this.scrollDirective.restore();
      if (this._direction === 'up') {
        const item = this.listItems.get(10).nativeElement;
        item.scrollIntoView();
        if (this.items.length >= 50) {
          this.items.splice(-10);
        }
      }
      if (this._direction === 'down') {
        if (this.items.length >= 50) {
          this.items.splice(0, 10);
          this.listItems.last.nativeElement.scrollIntoView();
        }
      }
    });
  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onScrolledUp(): void {
    console.log('scrolled up');
    this._direction = 'up';
    // const item = this.listItems.first.nativeElement;
    // console.log(item.getBoundingClientRect());
    // this.scrollDirective.prepareFor('up');
    this._getItems.emit([...generateItems(this.items.length), ...this.items]);
  }

  public onScrolledDown(): void {
    console.log('scrolled down');
    this._direction = 'down';
    this._scrollTop = this._viewport._scrollTop;
    this._scrollHeight = this._viewport.scrollHeight;
    this._getItems.emit([...this.items, ...generateItems(this.items.length)]);
  }

}
