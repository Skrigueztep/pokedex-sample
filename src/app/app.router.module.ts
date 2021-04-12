import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./ui/list/list.module').then(m => m.ListModule) },
  { path: 'profile', loadChildren: () => import('./ui/profile/profile.module').then(m => m.ProfileModule) },
  { path: ':pokemonId', loadChildren: () => import('./ui/detail/detail.module').then(m => m.DetailModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule { }
