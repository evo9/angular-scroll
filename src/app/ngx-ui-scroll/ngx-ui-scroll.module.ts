import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiScrollComponent } from './ngx-ui-scroll.component';
import { UiScrollModule } from 'ngx-ui-scroll';

import { NgxUiScrollRoutingModule } from './ngx-ui-scroll-routing.module';

@NgModule({
  declarations: [
    NgxUiScrollComponent,
  ],
  imports: [
    CommonModule,
    NgxUiScrollRoutingModule,
    UiScrollModule,
  ],
})
export class NgxUiScrollModule {}
