import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import PocketBase from 'pocketbase';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  form: FormGroup;
  share: string;
  private pb = new PocketBase('https://pocketbase.mag.recipes');
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      SpotifyURL: ['', Validators.required],
      Description: ['', []],
    });
    this.share = 'https://mag.recipes/client/' + this.pb.authStore.model?.id;
  }

  async onSubmit() {
    try {
      const data = {
        spotifyurl: this.form.value.SpotifyURL,
        description: this.form.value.Description,
        user: this.pb.authStore.model?.id,
      };

      await this.pb
        .collection('songs')
        .create(data)
        .then((_) => {
          this.form.reset();
        });
    } catch (err: any) {
      console.log(err);
      console.log(err.originalError);
    }
  }
}
