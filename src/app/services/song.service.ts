import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Subject } from 'rxjs';
import { SongModel } from '../model/SongModel';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  currentSongChange: Subject<SongModel> = new Subject<SongModel>();
  currentSong: SongModel = new SongModel();
  constructor() {}

  /**
   * Pipe a new song to the Subject
   * @param song New current song
   */
  pipeNextSong(song: SongModel) {
    this.currentSongChange.next(song);
  }

  /**
   * Get all the songs and push a random one to the pipe.
   */
  async getSongsFromUser() {
    const pb = new PocketBase('http://localhost:8090');
    try {
      const record = await pb.collection('songs').getFullList();
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
    } catch (err) {
      console.log(err);
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
