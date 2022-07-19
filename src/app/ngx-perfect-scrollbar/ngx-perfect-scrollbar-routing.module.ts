import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxPerfectScrollbarComponent } from './ngx-perfect-scrollbar.component';

const routes: Routes = [
  {
    path: '',
    component: NgxPerfectScrollbarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxPerfectScrollbarRoutingModule {}
