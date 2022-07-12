import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList, EventEmitter,
} from '@angular/core';
import { loremIpsum } from 'lorem-ipsum';
import { IPageInfo, VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { generate } from 'rxjs';

interface MyItem {
  id: number;
  text: string;
  image?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild(VirtualScrollerComponent) private _virtualScroller: VirtualScrollerComponent;




  public items = [];
  private _direction: 'up' | 'down';
  private _isChangesDetectionEnabled = true;

  public startIndex = 0;

  private _firstIndex = 1;
  private _newIndex = 0;

  public isScrollDisabled = false;
  private _scrollTop: number = 0;
  private _scrollContainer: any;
  private _scrollTimer: any;
  private _oldHeight: number;
  private _scrlTop: number;
  private _scrollEnabled = true;

  ngOnInit() {
    this.items = this._generateItems(20);
  }

  async ngAfterViewInit() {


    // this.datasource.adapter.isLoading$.subscribe(bool => {
    //   if (bool) {
    //     console.log(this.datasource.adapter.firstVisible);
    //   }
    // });


  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onScrolledUp() {
    console.log('scrolled up');
    this._generateItems(10).forEach(item => {
      this.items.unshift(item);
    });
  }

  public onScrolledDown() {
    console.log('scrolled down');
  }

  public onVirtualScroll(event: IPageInfo): void {
    const {startIndex} = event;
    console.log(startIndex, this.startIndex);
    if (this.startIndex > startIndex && startIndex === 1) {
      this._generateItems(10).forEach(item => {
        this.items.unshift(item);
      })
    }
    this.startIndex = startIndex;
  }

  public onScroll(): void {
    const scrollTop = this._scrollContainer.scrollTop;
    scrollTop > this._scrollTop ? this._onScrollDown() : this._onScrollUp();
    this._scrollTop = scrollTop;
  }

  private _onScrollUp(): void {
    this._direction = 'up';
    if (this._scrollTop <= 50 && this._scrollEnabled) {
      // this._scrollEnabled = false;


      this._scrlTop = this._scrollContainer.scrollTop;
      this._oldHeight = this._scrollContainer.scrollHeight;


      this.items = [...this._generateItems(10), ...this.items];
    }
  }

  private _onScrollDown(): void {
    this._direction = 'down';
    const position = this._scrollContainer.scrollTop + this._scrollContainer.offsetHeight;
    const height = this._scrollContainer.scrollHeight;

    if (position > height - 50) {
      this.items = [...this.items, ...this._generateItems(10)];
    }
  }

  private _generateItems(length: number) {
    const items = [];
    for (let i = 0; i < length; i++) {
      this._newIndex++;
      items.push(this._getItem())
    }

    return items
  }

  private _getItem() {
    return {
      id: this._newIndex,
      text: loremIpsum({
        count: 1,
        units: 'paragraph',
      }),
      image: this._newIndex % 2 === 0 ? `https://picsum.photos/50/50?random=${this._newIndex}` : null,
    }
  }
}
