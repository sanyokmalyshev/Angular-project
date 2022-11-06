import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('First Recipe', 'Some Description', 'https://e2.edimdoma.ru/data/posts/0002/3033/23033-ed4_wide.jpg?1631188650'),
    new Recipe('Second Recipe', 'Another Description', 'https://grandkulinar.ru/uploads/posts/2020-02/1580559759_recept-dnya-chto-prigotovit-v-fevrale.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
