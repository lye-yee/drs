import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'addnews',
    loadChildren: () => import('./addnews/addnews.module').then( m => m.AddnewsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'bookinginfo/:eightdate/:uid/:key',
    loadChildren: () => import('./bookinginfo/bookinginfo.module').then( m => m.BookinginfoPageModule)
  },
  {
    path: 'editnews/:key',
    loadChildren: () => import('./editnews/editnews.module').then( m => m.EditnewsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'addvou',
    loadChildren: () => import('./addvou/addvou.module').then( m => m.AddvouPageModule)
  },
  {
    path: 'userinfo/:key',
    loadChildren: () => import('./userinfo/userinfo.module').then( m => m.UserinfoPageModule)
  },
  {
    path: 'editvou/:key',
    loadChildren: () => import('./editvou/editvou.module').then( m => m.EditvouPageModule)
  },
  {
    path: 'broadcast',
    loadChildren: () => import('./broadcast/broadcast.module').then( m => m.BroadcastPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
