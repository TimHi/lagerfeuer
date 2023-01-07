import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-large-animated-logo',
  templateUrl: './large-animated-logo.component.html',
  styleUrls: ['./large-animated-logo.component.css'],
})
export class LargeAnimatedLogoComponent {
  options: AnimationOptions = { path: '/assets/bonfire.json' };
  constructor(private songService: SongService) {}

  fetchNewSong() {
    this.songService.getSongsFromUser();
  }
}
