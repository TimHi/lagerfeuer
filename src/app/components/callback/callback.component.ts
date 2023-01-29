import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './callback.component.html',
  styles: [],
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    // parse the query parameters from the redirected url
    const params = this.route.snapshot.queryParamMap;
    // load the previously stored provider's data
    const provider = JSON.parse(this.storage.get('provider'));
    // compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get('state') || !params.has('code')) {
      this.songService.handleAuthError(
        new Error("State parameters don't match.")
      );
      return;
    }
    this.songService.authenticateUser(provider, params.get('code')!);
  }
}
