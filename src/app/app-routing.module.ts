import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'client', component: HomeComponent },
  { path: 'client/:id', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'redirect', component: CallbackComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'add', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
