import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  clientId: string | null = null;

  constructor(private songService: SongService, private route: ActivatedRoute) {
    this.clientId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.isLoggedIn = this.songService.authGuardOk();
    this.songService.isLoggedInChange.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }
}
