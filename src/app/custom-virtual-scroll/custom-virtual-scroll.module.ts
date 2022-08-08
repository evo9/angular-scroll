import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomVirtualScrollRoutingModule } from './custom-virtual-scroll-routing.module';
import { CustomVirtualScrollComponent } from './custom-virtual-scroll.component';

@NgModule({
  declarations: [
    CustomVirtualScrollComponent,
  ],
  imports: [
    CommonModule,
    CustomVirtualScrollRoutingModule,
  ],
})
export class CustomVirtualScrollModule {}
