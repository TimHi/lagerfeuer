import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private songService: SongService) {}
  ngOnInit(): void {
    console.log('On Init');
    this.songService.isLoggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.isLoggedIn = this.songService.authGuardOk();
  }

  logout() {
    this.songService.logout();
  }
}
