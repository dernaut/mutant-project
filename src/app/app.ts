import { Component, signal } from '@angular/core';
import { AdnScanner } from "./components/adn-scanner/adn-scanner";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AdnScanner]
})
export class App {
  protected readonly title = signal('mutant-project');
}
