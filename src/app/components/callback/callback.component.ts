import PocketBase from 'pocketbase';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './callback.component.html',
  styles: [],
})
export class CallbackComponent implements OnInit {
  error: string = '';
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    let result: any;
    // parse the query parameters from the redirected url
    const params = this.route.snapshot.queryParamMap;

    // load the previously stored provider's data
    const provider = JSON.parse(this.storage.get('provider'));
    // compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get('state') || !params.has('code')) {
      this.error = "State parameters don't match.";
      return;
    }
    const pb = new PocketBase('http://127.0.0.1:8090');

    // authenticate
    pb.collection('users')
      .authWithOAuth2(
        provider.name,
        params.get('code')!,
        provider.codeVerifier,
        'http://localhost:4200/redirect',
        {
          emailVisibility: false,
        }
      )
      .then((authData: any) => {
        result = authData;
        this.username = authData?.record?.username;
        this.songService.setLoggedInStatus();
        if (this.username) {
          this.router.navigate(['/']);
        }
      })
      .catch((err: any) => {
        this.error = 'Failed to exchange code.\n' + err;
        console.log(err);
      });
  }
}
