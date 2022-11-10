import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isClickDropdown: boolean = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isClickDropdown
      = this.elRef.nativeElement.contains(event.target)
        ? !this.isClickDropdown
        : false;
  }
}
