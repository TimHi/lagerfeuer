import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'redirect', component: CallbackComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
