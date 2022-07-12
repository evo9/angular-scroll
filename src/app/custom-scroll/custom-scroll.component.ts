import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-custom-scroll',
  templateUrl: './custom-scroll.component.html',
  styleUrls: ['./custom-scroll.component.scss'],
})
export class CustomScrollComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogContainer', { static: false }) dialogContainer: ElementRef<HTMLDivElement>;
  @ViewChildren('messageItems') messageItems: QueryList<ElementRef<HTMLDivElement>>;

  public items = [];
  public isScrollDisabled = false;
  private _direction: 'up' | 'down';
  private _isChangesDetectionEnabled = true;
  private _scrollContainer: any;
  private _oldScrollTop = 0;
  private _oldHeight: number;
  private _scrollTop: number;
  private _isSpliceUp = false;

  constructor() { }

  ngOnInit(): void {
    this.items = generateItems(0, 20);
  }

  ngAfterViewInit() {
    this._scrollContainer = this.dialogContainer.nativeElement;

    this.messageItems.changes.subscribe(() => {
      if (this._isSpliceUp) {
        const diff = this._oldHeight - this._scrollContainer.scrollHeight;
        console.log(this._oldHeight, this._scrollContainer.scrollHeight, this._scrollTop, diff);
        this._scrollContainer.scrollTop = this._scrollTop - diff;
        this._isSpliceUp = false;
        return;
      }
      if (!this._isChangesDetectionEnabled) {
        this._isChangesDetectionEnabled = true;
        return;
      }

      if (this._direction === 'up') {
        const diff = this._scrollContainer.scrollHeight - this._oldHeight;
        this._scrollContainer.scrollTop = diff + this._scrollTop;
        this.items.splice(-10);
      }

      if (this._direction === 'down') {
        // const message = this.messageItems.get(10);
        // const position = message.nativeElement.getBoundingClientRect();
        // const height = position.top - position.height - 50;
        // console.log(height, this._scrollContainer.scrollTop);
        //
        // this.items.splice(0, 10);
        //
        // this._scrollContainer.scrollTop = this._scrollContainer.scrollTop + height;

        this._oldHeight = this._scrollContainer.scrollHeight;
        this._scrollTop = this._scrollContainer.scrollTop;
        this._isChangesDetectionEnabled = false;
        this._isSpliceUp = true;
        this.items.splice(0, 10);
      }

      // if (this.items.length >= 40) {
      //   this._isChangesDetectionEnabled = false
      //
      //   if (this._direction === 'up') {
      //     this.items.splice(-10);
      //     return;
      //   }
      //
      // }

      // this.isScrollDisabled = true;
    });

    // setTimeout(() => {
    //
    //
    //   // this.items.splice(-10);
    //   //
    //   // // const scrollTop = this._scrollContainer.scrollTop;
    //   // // const scrollHeight = this._scrollContainer.scrollHeight;
    //   //
    //   // this.items = [...generateItems(this.items.length - 1, 10), ...this.items];
    //   //
    //   //
    //   // setTimeout(() => {
    //   //   const item = this.messageItems.get(10);
    //   //   console.log()
    //   //   item.nativeElement.scrollIntoView();
    //   //
    //   //
    //   //   // const diff = this._scrollContainer.scrollHeight - scrollHeight;
    //   //   //   console.log(scrollHeight, this._scrollContainer.scrollHeight, diff, scrollTop, this._scrollContainer.scrollTop);
    //   //   // this._scrollContainer.scrollTop = scrollTop - diff;
    //   //
    //   // }, 1000);
    // }, 5000);
  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onScroll(): void {
    const scrollTop = this._scrollContainer.scrollTop;
    scrollTop > this._scrollTop ? this._onScrollDown() : this._onScrollUp();
    this._scrollTop = scrollTop;
  }

  private _onScrollUp(): void {
    this._direction = 'up';
    if (this._scrollTop <= 20) {
      this._oldHeight = this._scrollContainer.scrollHeight;
      this.items = [...generateItems(this.items.length - 1, 10), ...this.items];
    }
  }

  private _onScrollDown(): void {
    this._direction = 'down';
    const position = this._scrollContainer.scrollTop + this._scrollContainer.offsetHeight;
    const height = this._scrollContainer.scrollHeight;

    if (position > height - 50) {
      this.items = [...this.items, ...generateItems(this.items.length - 1)];
    }
  }

}
