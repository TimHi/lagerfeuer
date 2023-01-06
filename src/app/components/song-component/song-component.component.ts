import { Component, OnInit, SecurityContext } from '@angular/core';
import { SongModel } from 'src/app/model/SongModel';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UrlbypassPipe } from './UrlBypassPipe';

@Component({
  selector: 'app-song-component',
  templateUrl: './song-component.component.html',
  styleUrls: ['./song-component.component.css'],
})
export class SongComponentComponent implements OnInit {
  data: SongModel[] = [];
  currentUrl: string = '';
  index: number = 0;
  urlSuffix: string = '?utm_source=generator&theme=0';
  urlPrefix: string = 'https://embed.';
  private urlbypassPipe: UrlbypassPipe;
  constructor(private http: HttpClient, private sani: DomSanitizer) {
    this.urlbypassPipe = new UrlbypassPipe(sani);
    this.http
      .get<SongModel[]>('/assets/MockData.json')
      .subscribe((data: SongModel[]) => {
        data.forEach((element) => {
          element.SpotifyURL = element.SpotifyURL.replace(
            'track',
            'embed/track'
          );
        });
        this.data = data;
        this.currentUrl = data[0].SpotifyURL;
      });
  }
  ngOnInit(): void {}

  getSafeUrl() {
    console.log(this.currentUrl);
    return this.urlbypassPipe.transform(this.currentUrl);
  }
}
