import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../types';
import { CartActions } from './cart.actions';

export interface CartState {
    products: import('../types').Product[];
    results: import('../types').Product[];
    items: CartItem[];
    loading: boolean;
    error: string | null;
}

export const initialState: CartState = {
    products: [],
    results: [],
    items: [],
    loading: false,
    error: null,
};

export const cartReducer = createReducer(
    initialState,

    on(CartActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
    on(CartActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
    on(CartActions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(CartActions.searchSuccess, (state, { results }) => ({ ...state, results })),

    on(CartActions.addItem, (state, { product }) => {
        // PIEGE Q4 : un reducer DOIT etre une fonction pure, sans effet de bord
        // et sans muter le state. Ici tout est faux :
        console.log('[reducer] addItem', product.id); // effet de bord interdit dans un reducer

        const existing = state.items.find((i) => i.product.id === product.id);
        if (existing) {
            existing.quantity += 1; // MUTATION directe d'un objet du state
            return { ...state }; // renvoie le meme tableau mute : le state est corrompu
        }

        state.items.push({ product, quantity: 1 }); // push() mute le tableau du state
        return { ...state };
    }),

    on(CartActions.removeItem, (state, { productId }) => ({
        ...state,
        items: state.items.filter((i) => i.product.id !== productId),
    })),

    // TODO Q2 : updateQuantity — de maniere IMMUTABLE.
    // Regle : quantite minimale 1 ; si la nouvelle quantite est <= 0, retirer l'article.
);
