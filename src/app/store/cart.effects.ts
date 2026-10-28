import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
    private actions$ = inject(Actions);
    private productService = inject(ProductService);

    // Chargement du catalogue : OK (switchMap sur une action ponctuelle).
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.loadProducts),
            switchMap(() =>
                this.productService.getProducts().pipe(
                    map((products) => CartActions.loadProductsSuccess({ products })),
                    catchError((error) => of(CartActions.loadProductsFailure({ error: String(error) }))),
                ),
            ),
        ),
    );

    // PIEGE Q3 : recherche "au kilometre".
    // - pas de debounceTime : un appel par frappe clavier
    // - pas de distinctUntilChanged : rappels inutiles si la saisie ne change pas
    // - mergeMap au lieu de switchMap : les reponses lentes d'une ANCIENNE frappe
    //   peuvent arriver apres et ECRASER le resultat d'une frappe plus recente
    //   (la latence du service est volontairement variable).
    // Attendu : debounceTime(300) -> distinctUntilChanged() -> switchMap(...).
    search$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.search),
            mergeMap(({ query }) =>
                this.productService
                    .searchProducts(query)
                    .pipe(map((results) => CartActions.searchSuccess({ results }))),
            ),
        ),
    );
}
