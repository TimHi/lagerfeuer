import { Component } from '@angular/core';
import PocketBase from 'pocketbase';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  async post() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    try {
      // example create data
      const data = {
        asd: 'test',
        user: '06mh4os7iijgeq8',
      };

      const record = await pb.collection('posts').create(data);
    } catch (err: any) {
      console.log(err.originalError);
    }
  }
  async read() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const record = await pb.collection('posts').getFullList();
    console.log(record);
  }
}
