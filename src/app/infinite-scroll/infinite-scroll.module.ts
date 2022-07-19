import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule as BaseInfinityScrollModule } from 'ngx-infinite-scroll';

import { InfiniteScrollRoutingModule } from './infinite-scroll-routing.module';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { ScrollDirective } from '../directives/scroll.directive';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    ScrollDirective,
  ],
  imports: [
    CommonModule,
    InfiniteScrollRoutingModule,
    BaseInfinityScrollModule,
  ],
})
export class InfiniteScrollModule {}
