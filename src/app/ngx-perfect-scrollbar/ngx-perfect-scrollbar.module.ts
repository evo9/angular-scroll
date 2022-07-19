import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { NgxPerfectScrollbarRoutingModule } from './ngx-perfect-scrollbar-routing.module';
import { NgxPerfectScrollbarComponent } from './ngx-perfect-scrollbar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    NgxPerfectScrollbarComponent,
  ],
  imports: [
    CommonModule,
    NgxPerfectScrollbarRoutingModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class NgxPerfectScrollbarModule {}
