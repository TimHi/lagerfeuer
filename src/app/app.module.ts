import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LargeAnimatedLogoComponent } from './components/large-animated-logo/large-animated-logo.component';
import { HeaderComponent } from './components/header/header.component';
import { TextComponent } from './components/text/text.component';
import { SongComponentComponent } from './components/song-component/song-component.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { LoggedoutFireAnimationComponent } from './components/loggedout-fire-animation/loggedout-fire-animation.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LargeAnimatedLogoComponent,
    HeaderComponent,
    TextComponent,
    SongComponentComponent,
    CallbackComponent,
    LoginComponent,
    LoadingComponent,
    UserComponent,
    HomeComponent,
    HeaderBarComponent,
    FeatureListComponent,
    LoggedoutFireAnimationComponent,
    StartScreenComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
