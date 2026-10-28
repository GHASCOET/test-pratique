import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../types';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        // Chargement du catalogue (via effet)
        'Load Products': emptyProps(),
        'Load Products Success': props<{ products: Product[] }>(),
        'Load Products Failure': props<{ error: string }>(),

        // Panier
        'Add Item': props<{ product: Product }>(),
        'Remove Item': props<{ productId: string }>(),
        'Update Quantity': props<{ productId: string; quantity: number }>(),

        // Recherche (via effet RxJS)
        Search: props<{ query: string }>(),
        'Search Success': props<{ results: Product[] }>(),
    },
});
