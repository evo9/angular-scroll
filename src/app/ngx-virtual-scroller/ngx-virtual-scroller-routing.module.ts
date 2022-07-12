import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxVirtualScrollerComponent } from './ngx-virtual-scroller.component';

const routes: Routes = [
  {
    path: '',
    component: NgxVirtualScrollerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxVirtualScrollerRoutingModule {}
