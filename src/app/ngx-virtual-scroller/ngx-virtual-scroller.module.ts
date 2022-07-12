import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { NgxVirtualScrollerComponent } from './ngx-virtual-scroller.component';
import { NgxVirtualScrollerRoutingModule } from './ngx-virtual-scroller-routing.module';

@NgModule({
  declarations: [
    NgxVirtualScrollerComponent,
  ],
  imports: [
    CommonModule,
    NgxVirtualScrollerRoutingModule,
    VirtualScrollerModule,
  ],
})
export class NgxVirtualScrollerModule {}
