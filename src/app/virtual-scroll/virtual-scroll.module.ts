import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { VirtualScrollRoutingModule } from './virtual-scroll-routing.module';
import { VirtualScrollComponent } from './virtual-scroll.component';


@NgModule({
  declarations: [
    VirtualScrollComponent,
  ],
  imports: [
    CommonModule,
    VirtualScrollRoutingModule,
    ScrollingModule,
  ],
})
export class VirtualScrollModule {}
