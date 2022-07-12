import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'ui-scroll',
    loadChildren: () => import('./ngx-ui-scroll/ngx-ui-scroll.module').then(m => m.NgxUiScrollModule),
  },
  {
    path: 'virtual-scroll',
    loadChildren: () => import('./ngx-virtual-scroller/ngx-virtual-scroller.module').then(m => m.NgxVirtualScrollerModule),
  },
  {
    path: 'custom-scroll',
    loadChildren: () => import('./custom-scroll/custom-scroll.module').then(m => m.CustomScrollModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
