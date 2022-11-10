import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from 'src/app/shared/recipes.service';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: Recipes) { }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }

}
