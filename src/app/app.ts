import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Login } from './auth/login/login';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IMS-frontend');
}
