import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxUiScrollComponent } from './ngx-ui-scroll.component';


const routes: Routes = [
  {
    path: '',
    component: NgxUiScrollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxUiScrollRoutingModule {}
