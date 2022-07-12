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
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { SizeStrategy } from 'vscroll';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-ngx-ui-scroll',
  templateUrl: './ngx-ui-scroll.component.html',
  styleUrls: ['./ngx-ui-scroll.component.scss'],
})
export class NgxUiScrollComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogContainer', { static: false }) dialogContainer: ElementRef<HTMLDivElement>;
  @ViewChildren('messageItems') messageItems: QueryList<ElementRef<HTMLDivElement>>;

  private _data = new EventEmitter<any[]>();
  private _items = [];
  private _firstIndex = 0;
  private _lastIndex = 20;

  public datasource: IDatasource = new Datasource({
    get: (index, count, success) => {
      // success(generateItems(index, count));
      return this._data;
    },
    settings: {
      startIndex: 0,
      minIndex: 0,
      itemSize: 20,
      // sizeStrategy: SizeStrategy.Frequent,
    },
  });

  constructor() { }

  ngOnInit(): void {
    this._data.emit(this._items);
  }

  ngAfterViewInit() {
    const { adapter } = this.datasource;
    adapter.firstVisible$.subscribe(async (event) => {
      const { $index } = event;
      const { bufferInfo: { minIndex, maxIndex } } = adapter;

      if ($index === minIndex && this._firstIndex > $index) {
        console.log('prepend');
        const items = generateItems(maxIndex);
        await adapter.relax();
        await adapter.prepend({
          items,
        });
      }

      this._firstIndex = $index;
    });

    adapter.lastVisible$.subscribe(async (event) => {
      const { $index } = event;
      const { bufferInfo: { maxIndex } } = adapter;

      if ($index === maxIndex && this._lastIndex < $index) {
        console.log('append');
        // const items = generateItems(maxIndex);
        // await adapter.relax();
        // await adapter.append({
        //   items,
        // });
      }
      //
      this._lastIndex = $index;
    });

    // adapter.isLoading$.subscribe(isLoading => {
    //   if (isLoading) {
    //     this.messageItems.forEach(item => {
    //       if (this._isVisible(item)) {
    //         console.log(item.nativeElement.classList);
    //       }
    //     });
    //   }
    // });


    setTimeout(() => {
      this._items = generateItems(0, 20);
      this._data.emit(this._items);
    }, 200);
  }

  public onClickItem(index: number): void {
    // const message = this.messageItems.get(index);
    // const position = message.nativeElement.getBoundingClientRect();
    //
    // this.dialogContainer.nativeElement.scrollTop = position.top;
    const message = this.messageItems.last;

    this.dialogContainer.nativeElement.scrollTop = message.nativeElement.getBoundingClientRect().bottom;
  }

  private _isVisible(item: ElementRef): boolean {
    const container = this.dialogContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const position = item.nativeElement.getBoundingClientRect();

    return position.top >= scrollTop && position.bottom <= scrollTop + clientHeight;
  }
}
