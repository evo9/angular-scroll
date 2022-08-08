import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomScrollComponent } from './custom-scroll.component';
import { CustomScrollRoutingModule } from './custom-scroll-routing.module';
import { CustomVirtualScrollerModule } from '../custom-virtual-scroller/custom-virtual-scroller.module';

@NgModule({
  declarations: [
    CustomScrollComponent,
  ],
  imports: [
    CommonModule,
    CustomScrollRoutingModule,
    CustomVirtualScrollerModule,
  ],
})
export class CustomScrollModule {}
