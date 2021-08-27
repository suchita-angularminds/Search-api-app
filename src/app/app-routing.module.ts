import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadChildren: 'src/app/pages/search/search.module#SearchModule',
    //loadChildren: () => import('src/app/pages/search/search.module').then(m => m.SearchModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { title: '404 - Page not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
