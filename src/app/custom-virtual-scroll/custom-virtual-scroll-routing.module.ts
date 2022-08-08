import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomVirtualScrollComponent } from './custom-virtual-scroll.component';

const routes: Routes = [
  {
    path: '',
    component: CustomVirtualScrollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomVirtualScrollRoutingModule {}
