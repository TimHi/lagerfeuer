import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loggedout-fire-animation',
  templateUrl: './loggedout-fire-animation.component.html',
  styleUrls: ['./loggedout-fire-animation.component.css'],
})
export class LoggedoutFireAnimationComponent {
  options: AnimationOptions = { path: '/assets/bonfire.json' };
}
