import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { Recipes } from "./recipes.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: Recipes,
    private authService: AuthService,
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();

    return this.http.put('https://recipe-book-36385-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-36385-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipes => {
            return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients: []}
          })
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes)
        })
      )
  }
}
