import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from './calculator/calculator';

@Component({
  imports: [RouterOutlet, Calculator],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('swapp16045-frontend');
}
