import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { SizeStrategy } from 'vscroll';

import { generateItems } from '../utils/app.util';

@Component({
  selector: 'app-ngx-ui-scroll',
  templateUrl: './ngx-ui-scroll.component.html',
  styleUrls: ['./ngx-ui-scroll.component.scss'],
})
export class NgxUiScrollComponent implements OnInit, AfterViewInit {

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
    //
    //
    //   this.items = this._generateItems(20);
    //
    // adapter.relax();
    // adapter.insert({ items: this.items });
    //
    // // adapter.bof$.subscribe(index => {
    // //   console.log(index);
    // // })
    //
    // // const container = this.scrollContainer.nativeElement;
    // //
    // // setTimeout(() => {
    // //   container.scrollTop = container.scrollHeight+200;
    // // }, 200);
    //
    // adapter.isLoading$.subscribe(val => console.log(val));
    //
    adapter.firstVisible$.subscribe(async (event) => {
      const { $index } = event;
      const { bufferInfo: { minIndex, maxIndex } } = adapter;

      // console.log($index, adapter.bufferInfo);

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
      const { bufferInfo: { minIndex, maxIndex } } = adapter;

      console.log($index, adapter.bufferInfo);

      if ($index === maxIndex && this._lastIndex < $index) {
        console.log('append');
        const items = generateItems(maxIndex);

        await adapter.relax();
        await adapter.append({
          items,
        });
      }
      //
      this._lastIndex = $index;
    });

    setTimeout(() => {
      this._items = generateItems(0, 20);
      this._data.emit(this._items);
    }, 200);
  }
}
