import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, isAuthenticated } from './shared/services';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  /*{
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },*/
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [
      isAuthenticated
    ]
  },
  {
    path: 'login/:codigo',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [
      isAuthenticated
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      bindToComponentInputs: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
