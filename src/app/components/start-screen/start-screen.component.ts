import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css'],
})
export class StartScreenComponent {
  constructor(private songService: SongService, private router: Router) {
    if (this.songService.authGuardOk()) {
      this.router.navigate(['/client']);
    }
  }
}
