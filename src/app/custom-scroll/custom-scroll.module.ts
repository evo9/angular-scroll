import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomScrollComponent } from './custom-scroll.component';
import { CustomScrollRoutingModule } from './custom-scroll-routing.module';

@NgModule({
  declarations: [
    CustomScrollComponent,
  ],
  imports: [
    CommonModule,
    CustomScrollRoutingModule,
  ],
})
export class CustomScrollModule {}
