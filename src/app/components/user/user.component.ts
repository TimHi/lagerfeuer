import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import PocketBase from 'pocketbase';
import { environment } from 'src/enviroments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  form: FormGroup;
  share: string;
  private pb = new PocketBase(environment.backendUrl);
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      SpotifyURL: ['', Validators.required],
      Description: ['', []],
    });
    this.share = environment.site + 'client/' + this.pb.authStore.model?.id;
  }

  async onSubmit() {
    if (
      this.form.value.SpotifyURL === '' ||
      this.form.value.Description === ''
    ) {
      this.toastr.error(
        'Not enough data provided!',
        'Please enter your song and description!',
        {
          timeOut: 2000,
          positionClass: 'toast-bottom-center',
        }
      );
    } else {
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
}
