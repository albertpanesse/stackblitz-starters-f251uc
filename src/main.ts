import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { ComponentModule } from './components/component.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [ComponentModule],
  template: `<workspace />`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
