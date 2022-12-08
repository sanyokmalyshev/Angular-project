import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./app/auth/auth-interceptor.service";
import { LoggingService } from "./app/logging.service";
import { Recipes } from "./app/shared/recipes.service";
import { ShoppingListService } from "./app/shared/shopping-list.service";

@NgModule({
  providers: [
    ShoppingListService,
    Recipes,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ]
})
export class CoreModule {}
