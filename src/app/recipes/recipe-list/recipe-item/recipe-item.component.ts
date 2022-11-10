import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipes } from 'src/app/shared/recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipes: Recipes) { }

  ngOnInit(): void {
  }

  selectItem() {
    this.recipes.recipeSelected.emit(this.recipe);
  }
}
