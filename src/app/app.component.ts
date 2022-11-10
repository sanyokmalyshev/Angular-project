import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage: string = 'recipes';

  choosePage(page: string) {
    this.currentPage = page;
  }
}
