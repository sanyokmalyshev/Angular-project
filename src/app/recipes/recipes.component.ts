import { Component, OnInit } from '@angular/core';
import { Recipes } from '../shared/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [Recipes]
})
export class RecipesComponent {
  selectedRecipe: Recipe;

  constructor(private recipes: Recipes) { }

  ngOnInit(): void {
    this.recipes.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

}
