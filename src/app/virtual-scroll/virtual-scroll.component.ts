import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss'],
})
export class VirtualScrollComponent implements OnInit, AfterViewInit {

  // @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  @ViewChildren('listItemsUnder') listItemsUnder: QueryList<ElementRef<HTMLDivElement>>
  @ViewChildren('listItems') listItems: QueryList<ElementRef<HTMLDivElement>>

  public itemsUnder = [];
  public items = [];
  public itemSize: number = 100;

  constructor(/*private _scrollDispatcher: ScrollDispatcher*/) { }

  ngOnInit(): void {
    this.items = generateItems(0, 20);

    setTimeout(() => {
      this.items = [...generateItems(this.items.length), ...this.items];
      // this.viewport.scrollToIndex(9);
    }, 5000);
  }

  ngAfterViewInit() {
    // this._scrollDispatcher.scrolled().subscribe(event => {
    //   console.log(event);
    // });
    // this.listItemsUnder.changes.subscribe(() => {
    //   this.listItemsUnder.forEach(item => {
    //     const id = item.nativeElement.id;
    //     console.log(item.nativeElement.clientHeight, item.nativeElement.offsetHeight)
    //     this.viewportItems.push({ ...this.itemsUnder[id], height: item.nativeElement.clientHeight })
    //   });
    // })
  }

  public trackByIndexFn(index: number): number {
    return index;
  }

  public onChangeIndex(index: number): void {
    console.log(index);
  }
}
