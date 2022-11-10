import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class Recipes {
  private recipes: Recipe[] = [
    new Recipe(
      'First Recipe',
      'Some Description',
      'https://e2.edimdoma.ru/data/posts/0002/3033/23033-ed4_wide.jpg?1631188650',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Second Recipe',
      'Another Description',
      'https://grandkulinar.ru/uploads/posts/2020-02/1580559759_recept-dnya-chto-prigotovit-v-fevrale.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 3)
      ]),
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredient(ingredients);
  }
}
