import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  // @Output() ingredient = new EventEmitter<Ingredient>();
  isError: boolean = false;


  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
  }

  handleAdd() {
    this.isError = false;
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;

    if (!name || !amount) {
      this.isError = true;
      return;
    }

    this.shoppingService.addIngredient(new Ingredient(name, amount));
    this.nameInput.nativeElement.value = "";
    this.amountInput.nativeElement.value = "";
  }
}
