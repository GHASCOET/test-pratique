import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem, Product } from '../../types';
import { CartActions } from '../../store/cart.actions';
import {
    selectItemCount,
    selectItems,
    selectLoading,
    selectProducts,
    selectResults,
    selectTotalMonthly,
} from '../../store/cart.selectors';

@Component({
    selector: 'app-exercise',
    standalone: true,
    // PIEGE : CommonModule n'est plus necessaire en Angular 21 si on utilise @if/@for.
    imports: [CommonModule, FormsModule],
    template: `
        <section class="exercise">
            <h2>Panier Telecom</h2>

            <!-- === RECHERCHE (Q3) === -->
            <div class="search">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    [(ngModel)]="searchQuery"
                    (input)="onSearch(searchQuery)"
                />
                <!-- TODO Q3 : afficher les resultats de recherche (selectResults) -->
            </div>

            <!-- === CATALOGUE (Q1) === -->
            <div class="catalog">
                <h3>Catalogue</h3>

                <div *ngIf="loading" class="loading"><p>Chargement des produits...</p></div>

                <!-- PIEGE : *ngFor (ancienne syntaxe) + pas de track -> prefer @for (...; track p.id) -->
                <div class="product-grid">
                    <div *ngFor="let product of products" class="product-card">
                        <span class="badge">{{ product.type }}</span>
                        <h4>{{ product.name }}</h4>
                        <p class="desc">{{ product.description }}</p>
                        <div class="pricing">
                            <span *ngIf="product.price > 0">{{ product.price }} &euro;/mois</span>
                            <span *ngIf="product.upfrontPrice > 0">{{ product.upfrontPrice }} &euro; comptant</span>
                        </div>
                        <!-- TODO Q1 : bouton "Ajouter au panier" -> dispatch addItem -->
                    </div>
                </div>
            </div>

            <!-- === PANIER (Q1/Q2) === -->
            <div class="cart">
                <h3>Panier ({{ itemCount }})</h3>
                <!-- TODO Q1/Q2 : lister les items, boutons + / -, total mensuel -->
                <p class="total">Total mensuel : {{ totalMonthly }} &euro;/mois</p>
            </div>
        </section>
    `,
    styles: [`
        .exercise { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; }
        h2 { margin-top: 0; color: var(--primary); }
        .search input { width: 100%; max-width: 420px; padding: 0.6rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius); font: inherit; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem; }
        .product-card { border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; }
        .product-card h4 { margin: 0.5rem 0 0.25rem; font-size: 1rem; }
        .desc { color: var(--text-light); font-size: 0.85rem; }
        .pricing { margin-top: 0.5rem; display: flex; gap: 0.75rem; font-size: 0.85rem; color: var(--primary); }
        .cart { margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1rem; }
        .total { font-weight: 600; }
        .loading { color: var(--text-light); }
    `]
})
export class ExerciseComponent implements OnInit {
    // PIEGE : injection par constructeur. En Angular 21 on privilegie inject().
    constructor(private store: Store) {}

    // Flux prets a l'emploi (a consommer avec le pipe async dans le template).
    products$: Observable<Product[]> = this.store.select(selectProducts);
    loading$ = this.store.select(selectLoading);
    results$ = this.store.select(selectResults);
    items$ = this.store.select(selectItems);
    itemCount$ = this.store.select(selectItemCount);
    totalMonthly$ = this.store.select(selectTotalMonthly);

    searchQuery = '';

    // PIEGE Q4 : on recopie les flux dans des champs via des subscriptions manuelles
    // JAMAIS liberees -> fuite memoire. A remplacer par le pipe async (products$ | async)
    // dans le template, ou par takeUntilDestroyed().
    products: Product[] = [];
    items: CartItem[] = [];
    itemCount = 0;
    totalMonthly = 0;
    loading = true;

    ngOnInit(): void {
        // TODO Q1 : declencher le chargement -> this.store.dispatch(CartActions.loadProducts())

        // PIEGE Q4 : 5 subscriptions sans unsubscribe
        this.store.select(selectProducts).subscribe((p) => (this.products = p));
        this.store.select(selectLoading).subscribe((l) => (this.loading = l));
        this.store.select(selectItems).subscribe((i) => (this.items = i));
        this.store.select(selectItemCount).subscribe((c) => (this.itemCount = c));
        this.store.select(selectTotalMonthly).subscribe((t) => (this.totalMonthly = t));
    }

    onSearch(query: string): void {
        // TODO Q3 : dispatch de la recherche
        // this.store.dispatch(CartActions.search({ query }));
    }

    // TODO Q1 : addToCart(product: Product)
    // TODO Q2 : increment(productId) / decrement(productId) via updateQuantity
}
