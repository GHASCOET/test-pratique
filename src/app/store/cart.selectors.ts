import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectProducts = createSelector(selectCart, (s) => s.products);
export const selectResults = createSelector(selectCart, (s) => s.results);
export const selectLoading = createSelector(selectCart, (s) => s.loading);
export const selectItems = createSelector(selectCart, (s) => s.items);

// PIEGE Q2 : compte le nombre de LIGNES du panier, pas la somme des quantites.
// Ajouter 3x le meme produit doit afficher 3, pas 1.
export const selectItemCount = createSelector(selectItems, (items) => items.length);

// Total mensuel (somme price * quantite)
export const selectTotalMonthly = createSelector(selectItems, (items) =>
    items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
);
