import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import PocketBase from 'pocketbase';
import { SongService } from 'src/app/services/song.service';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  currentUser: any;
  authMethods: any;
  redirectUri: string = '';
  authUrl: string = '';
  isLoggedIn = false;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.songService.authGuardOk();
    this.songService.isLoggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.getAuth();
  }

  /**
   * Fetch the available Auth Methods from the Backend and fill in the data.
   * Only Spotify is used but there is still the foreach cause why not?
   */
  async getAuth() {
    const authMethods = await this.songService.getAuthMethods();
    authMethods.authProviders.forEach((prov) => {
      this.authUrl = prov.authUrl;
      this.storage.remove('provider');
      this.storage.set('provider', JSON.stringify(prov));
    });
    this.authMethods = authMethods;
    this.redirectUri = environment.redirectUrl;
  }
}
