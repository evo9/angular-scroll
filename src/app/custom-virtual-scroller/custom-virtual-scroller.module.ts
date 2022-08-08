import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomVirtualScrollerComponent } from './custom-virtual-scroller.component';


@NgModule({
  declarations: [
    CustomVirtualScrollerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [CustomVirtualScrollerComponent],
})
export class CustomVirtualScrollerModule {}
