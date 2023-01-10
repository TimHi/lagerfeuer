import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase';
import { Subject } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { SongModel } from '../model/SongModel';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  currentSongChange: Subject<SongModel> = new Subject<SongModel>();
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();
  private pb: PocketBase = new PocketBase(environment.backendUrl);

  constructor(private router: Router) {
    this.isLoggedInChange.next(this.authGuardOk());
  }

  setLoggedInStatus() {
    this.isLoggedInChange.next(this.authGuardOk());
  }

  /**
   * Pipe a new song to the Subject
   * @param song New current song
   */
  pipeNextSong(song: SongModel) {
    this.currentSongChange.next(song);
  }

  authGuardOk(): boolean {
    return this.pb.authStore.isValid;
  }

  handleAuthError(err: any) {
    //TODO: Display Toast
    console.log(err);
    this.logout();
  }

  logout() {
    this.pb.authStore.clear();
    this.isLoggedInChange.next(this.pb.authStore.isValid);
    this.router.navigate(['/']);
  }

  async authenticateUser(provider: any, code: string) {
    let result: any;
    // authenticate
    this.pb
      .collection('users')
      .authWithOAuth2(
        provider.name,
        code,
        provider.codeVerifier,
        environment.redirectUrl,
        {
          emailVisibility: false,
        }
      )
      .then((authData: any) => {
        result = authData;
        const username = authData?.record?.username;
        this.setLoggedInStatus();
        if (username !== undefined && username !== null) {
          this.router.navigate(['/client']);
        }
      })
      .catch((err: any) => {
        this.handleAuthError(err);
      });
  }

  /**
   * List the available auth methods
   * @returns Oauth2 Authmethods from the Pocketbase Backend
   */
  async getAuthMethods() {
    return await this.pb.collection('users').listAuthMethods();
  }

  /**
   * Get all the songs and push a random one to the pipe.
   * TODO: Fetch one random?
   */
  async getSongsFromUser(clientId: string | null) {
    try {
      let id;
      if (clientId === null) {
        id = this.pb.authStore.model?.id;
      } else {
        id = clientId;
      }
      const record = await this.pb.collection('songs').getFullList(100000, {
        filter: `user.id='${id}'`,
      });

      let songs: SongModel[] = [];
      record.forEach((element) => {
        element['spotifyurl'] = element['spotifyurl'].replace(
          'track',
          'embed/track'
        );
        songs.push({
          description: element['description'],
          spotifyurl: element['spotifyurl'],
        });
      });
      this.pipeNextSong(this.getRandomObject(songs));
    } catch (err: any) {
      this.handleAuthError(err);
    }
  }

  /**
   * Get a random object from a given list
   * @param list List to fetch the element from
   * @returns Random element
   */
  getRandomObject<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }
}
