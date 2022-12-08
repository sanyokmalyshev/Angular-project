import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class Recipes {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'First Recipe',
  //     'Some Description',
  //     'https://e2.edimdoma.ru/data/posts/0002/3033/23033-ed4_wide.jpg?1631188650',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(
  //     'Second Recipe',
  //     'Another Description',
  //     'https://grandkulinar.ru/uploads/posts/2020-02/1580559759_recept-dnya-chto-prigotovit-v-fevrale.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 3)
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredient(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
