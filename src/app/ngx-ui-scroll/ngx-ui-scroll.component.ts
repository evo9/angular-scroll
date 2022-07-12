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
import { Datasource, IDatasource, IAdapter } from 'ngx-ui-scroll';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-ngx-ui-scroll',
  templateUrl: './ngx-ui-scroll.component.html',
  styleUrls: ['./ngx-ui-scroll.component.scss'],
})
export class NgxUiScrollComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogContainer', { static: false }) dialogContainer: ElementRef<HTMLDivElement>;
  @ViewChildren('messageItems') messageItems: QueryList<ElementRef<HTMLDivElement>>;

  private _items = [];
  private _firstIndex = 0;
  private _lastIndex = 20;
  private _adapter: IAdapter
  private _maxIndex = 0;

  public datasource: IDatasource;

  constructor() { }

  ngOnInit(): void {
    this._items = generateItems(0, 20);
    this._setDataSource();
  }

  ngAfterViewInit() {
    this._adapter = this.datasource.adapter;
    this._adapter.firstVisible$.subscribe(async (event) => {
      const { $index } = event;
      const { bufferInfo: { minIndex, maxIndex } } = this._adapter;

      if ($index === minIndex && this._firstIndex > $index) {
        console.log('prepend');
        const items = generateItems(maxIndex);

        await this._adapter.relax();
        await this._adapter.prepend({ items });
      }

      this._firstIndex = $index;
    });

    this._adapter.lastVisible$.subscribe(async (event) => {
      const { $index } = event;
      const { bufferInfo: { maxIndex } } = this._adapter;

      if ($index === maxIndex && this._lastIndex < $index) {
        console.log('append');
        // setTimeout(async () => {
          const items = generateItems(maxIndex);
          await this._adapter.relax();
          await this._adapter.append({ items, });
          // await this._adapter.clip({backwardOnly: true});
        // }, 1000);
      }
      //
      this._lastIndex = $index;
    });

    // this._adapter.isLoading$.subscribe(isLoading => {
    //   if (isLoading) {
    //     this.messageItems.forEach(item => {
    //       if (this._isVisible(item)) {
    //         console.log(item.nativeElement.classList);
    //       }
    //     });
    //   }
    // });

  }

  public async onClickItem(index: number): Promise<void> {
    // await this._adapter.relax();
    // await this._adapter.insert({ items: generateItems(0, 30), decrease: false });
    // console.log(this.messageItems.length);

    // const message = this.messageItems.get(index);
    // const position = message.nativeElement.getBoundingClientRect();
    //
    // this.dialogContainer.nativeElement.scrollTop = position.top;
    // const message = this.messageItems.last;
    //
    // this.dialogContainer.nativeElement.scrollTop = message.nativeElement.getBoundingClientRect().bottom;

   /* const items = generateItems(0, 1);
    //
    await this._adapter.relax();
    await this._adapter.append({ items });

    console.log(this._adapter.lastVisible)

    const item = this.messageItems.get(this._adapter.bufferInfo.maxIndex);
    item.nativeElement.scrollIntoView()*/

    // setTimeout(async () => {
    //   const item = this.messageItems.last.nativeElement;
    //   const itemRect = item.getBoundingClientRect();
    //   const container = this.dialogContainer.nativeElement;
    //   const position = container.scrollTop + container.offsetHeight;
    //   const height = container.scrollHeight;
    //
    //   console.log(position, height, itemRect, this._adapter.lastVisible);
    //   if (position >= height - itemRect.height) {
    //     console.log(position, height, itemRect.height);
    //     container.scrollTop = height;
    //   }
    // }, 200);
  }

  private _setDataSource(): void {
    this.datasource = new Datasource({
      get: (start, count, success) => {
        let data = [];
        const end = Math.min(start + count - 1, this._items.length - 1);

        if (start <= end) {
          data = this._items.slice(start, end + 1);
        }

        success(data);
      },
      settings: {
        startIndex: 0,
        // minIndex: 0,
        itemSize: 20,
      },
    });
  }

  private _isVisible(item: ElementRef): boolean {
    const container = this.dialogContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const position = item.nativeElement.getBoundingClientRect();

    return position.top >= scrollTop && position.bottom <= scrollTop + clientHeight;
  }
}
