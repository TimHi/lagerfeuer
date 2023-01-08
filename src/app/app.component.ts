import { Component, OnInit } from '@angular/core';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lagerfeuer';

  ngOnInit(): void {}
}
