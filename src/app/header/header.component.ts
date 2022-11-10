import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() page = new EventEmitter<string>();
  collapsed = true;

  onSelect(selectedPage: string) {
    this.page.emit(selectedPage);
  }
}
