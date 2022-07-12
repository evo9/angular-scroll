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
  private _oldHeight: number;
  private _scrollTop: number;

  constructor() { }

  ngOnInit(): void {
    this.items = generateItems(0, 20);
  }

  ngAfterViewInit() {
    this._scrollContainer = this.dialogContainer.nativeElement;

    this.messageItems.changes.subscribe(() => {
      // console.log(this._direction)
      // if (this._isSpliceUp && this._direction === 'down') {
      //   const diff = this._oldHeight - this._scrollContainer.scrollHeight;
      //   console.log(this._oldHeight, this._scrollContainer.scrollHeight, this._scrollTop, diff);
      //   this._scrollContainer.scrollTop = this._scrollTop - diff;
      //   this._isSpliceUp = false;
      //   setTimeout(() => {
      //     this.isScrollDisabled = false;
      //   }, 100);
      //   return;
      // }

      if (!this._isChangesDetectionEnabled) {
        this._isChangesDetectionEnabled = true;
        return;
      }

      if (this._direction === 'up') {
        const diff = this._scrollContainer.scrollHeight - this._oldHeight;
        this._scrollContainer.scrollTop = diff + this._scrollTop;
        // this.items.splice(-10);
        setTimeout(() => {
          this.isScrollDisabled = false;
        }, 100);
      }

      // if (this._direction === 'down') {
      //   // const message = this.messageItems.get(10);
      //   // const position = message.nativeElement.getBoundingClientRect();
      //   // const height = position.top - position.height - 50;
      //   // console.log(height, this._scrollContainer.scrollTop);
      //   //
      //   // this.items.splice(0, 10);
      //   //
      //   // this._scrollContainer.scrollTop = this._scrollContainer.scrollTop + height;
      //
      //   this._oldHeight = this._scrollContainer.scrollHeight;
      //   this._scrollTop = this._scrollContainer.scrollTop;
      //   // this._isChangesDetectionEnabled = false;
      //   this._isSpliceUp = true;
      //   this.items.splice(0, 10);
      // }
    });
  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onScroll(): void {
    if (this.isScrollDisabled) {
      return;
    }
    const scrollTop = this._scrollContainer.scrollTop;
    scrollTop > this._scrollTop ? this._onScrollDown() : this._onScrollUp();
    this._scrollTop = scrollTop;
  }

  private _onScrollUp(): void {
    this._direction = 'up';
    if (this._scrollTop <= 20) {
      // this.isScrollDisabled = true;
      this._oldHeight = this._scrollContainer.scrollHeight;
      this.items = [...generateItems(this.items.length - 1, 10), ...this.items];
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
