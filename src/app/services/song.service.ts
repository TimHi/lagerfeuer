import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor() {}

  async getSongsFromUser() {
    const pb = new PocketBase('http://130.61.219.179:8090');
    const record = await pb.collection('songs').getFullList();
    return record;
  }
}
