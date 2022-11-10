import { EventEmitter } from "@angular/core";
import { Ingredient } from "./ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredients: Ingredient | Ingredient[]) {
    if (!Array.isArray(ingredients)) {
      this.ingredients.push(ingredients);
    } else {
      this.ingredients = [
        ...this.ingredients,
        ...ingredients,
      ]
    }

    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
