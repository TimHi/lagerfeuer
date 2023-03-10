import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { SongModel } from 'src/app/model/SongModel';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UrlbypassPipe } from './UrlBypassPipe';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-component',
  templateUrl: './song-component.component.html',
  styleUrls: ['./song-component.component.css'],
})
export class SongComponentComponent implements OnInit {
  data: SongModel[] = [];

  index: number = 0;
  urlSuffix: string = '?utm_source=generator&theme=0';
  urlPrefix: string = 'https://embed.';
  private urlbypassPipe: UrlbypassPipe;
  currentSong: SongModel = new SongModel();

  constructor(
    private http: HttpClient,
    private sani: DomSanitizer,
    private songService: SongService
  ) {
    this.urlbypassPipe = new UrlbypassPipe(sani);
    songService.currentSongChange.subscribe((value) => {
      this.currentSong = value;
    });
  }

  ngOnInit(): void {}

  getSafeUrl() {
    return this.urlbypassPipe.transform(this.currentSong.spotifyurl);
  }
}
