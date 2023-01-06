import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-large-animated-logo',
  templateUrl: './large-animated-logo.component.html',
  styleUrls: ['./large-animated-logo.component.css'],
})
export class LargeAnimatedLogoComponent {
  options: AnimationOptions = { path: '/assets/bonfire.json' };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
