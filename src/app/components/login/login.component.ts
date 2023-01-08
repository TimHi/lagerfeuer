import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-login',
  template: `
    <div class="responsive">
      <ng-container *ngIf="currentUser; else loading; else: authOptions">
        <p>👨‍💻 Iglogt als {{ currentUser.username }}</p>
      </ng-container>
      <ng-template #loading>
        <div
          style="margin: 0 auto; display: block; width: 100px; margin-top: 200px;"
        >
          <a class="loader large"></a>
        </div>
      </ng-template>
      <ng-template #authOptions>
        <a href="{{ authUrl + redirectUri }}" class="responsive large-margin">
          <button class="large medium-elevate responsive">
            <img
              class="responsive"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
            <span>Login</span>
          </button>
        </a>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  currentUser: any;
  authMethods: any;
  redirectUri: string = '';
  name: string = '';
  authUrl: string = '';
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAuth();
  }

  async getAuth() {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const authMethods = await pb.collection('users').listAuthMethods();
    authMethods.authProviders.forEach((prov) => {
      this.authUrl = prov.authUrl;
      this.name = prov.name;
      this.storage.remove('provider');
      this.storage.set('provider', JSON.stringify(prov));
    });
    this.authMethods = authMethods;
    this.redirectUri = 'http://localhost:4200/redirect';
  }
}
