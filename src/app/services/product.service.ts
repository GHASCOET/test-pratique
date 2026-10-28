import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../types';

@Injectable({ providedIn: 'root' })
export class ProductService {

    private products: Product[] = [
        // Telephones
        {
            id: 'phone-1',
            name: 'Samsung Galaxy S25 Ultra',
            type: 'phone',
            price: 8.99,
            upfrontPrice: 349.00,
            description: 'Le dernier flagship Samsung avec stylet integre et IA embarquee.',
            compatible: ['plan-1', 'plan-2', 'plan-3', 'acc-1'],
        },
        {
            id: 'phone-2',
            name: 'iPhone 16 Pro Max',
            type: 'phone',
            price: 12.99,
            upfrontPrice: 449.00,
            description: 'Le smartphone Apple le plus avance avec puce A18 Pro.',
            compatible: ['plan-1', 'plan-2', 'plan-3', 'acc-2'],
        },
        {
            id: 'phone-3',
            name: 'Google Pixel 9 Pro',
            type: 'phone',
            price: 5.99,
            upfrontPrice: 249.00,
            description: 'Le meilleur de Google avec Tensor G4 et fonctions IA.',
            compatible: ['plan-1', 'plan-2', 'plan-3', 'acc-1'],
        },
        {
            id: 'phone-4',
            name: 'Xiaomi 14 Ultra',
            type: 'phone',
            price: 3.99,
            upfrontPrice: 199.00,
            description: 'Smartphone premium avec optique Leica.',
            compatible: ['plan-1', 'plan-2', 'plan-3'],
        },
        {
            id: 'phone-5',
            name: 'Samsung Galaxy A55',
            type: 'phone',
            price: 1.00,
            upfrontPrice: 49.00,
            description: 'Excellent rapport qualite-prix avec ecran AMOLED.',
            compatible: ['plan-1', 'plan-2', 'plan-3', 'acc-1'],
        },
        {
            id: 'phone-6',
            name: 'iPhone SE 4',
            type: 'phone',
            price: 4.99,
            upfrontPrice: 149.00,
            description: 'L\'iPhone accessible avec puce A16 Bionic.',
            compatible: ['plan-1', 'plan-2', 'plan-3', 'acc-2'],
        },

        // Forfaits
        {
            id: 'plan-1',
            name: 'Forfait Sensation 50Go',
            type: 'plan',
            price: 24.99,
            upfrontPrice: 0,
            description: '50Go de data en 5G, appels et SMS illimites.',
        },
        {
            id: 'plan-2',
            name: 'Forfait Sensation 100Go',
            type: 'plan',
            price: 32.99,
            upfrontPrice: 0,
            description: '100Go de data en 5G+, appels et SMS illimites, 35Go en Europe.',
        },
        {
            id: 'plan-3',
            name: 'Forfait Sensation 200Go',
            type: 'plan',
            price: 42.99,
            upfrontPrice: 0,
            description: '200Go de data en 5G+, appels et SMS illimites, 70Go en Europe.',
        },
        {
            id: 'plan-4',
            name: 'Forfait B&You 20Go',
            type: 'plan',
            price: 9.99,
            upfrontPrice: 0,
            description: '20Go de data en 4G, appels et SMS illimites. Sans engagement.',
        },

        // Accessoires
        {
            id: 'acc-1',
            name: 'Coque Protection Premium',
            type: 'accessory',
            price: 0,
            upfrontPrice: 29.99,
            description: 'Coque de protection renforcee compatible Samsung et Google.',
        },
        {
            id: 'acc-2',
            name: 'Coque MagSafe Silicone',
            type: 'accessory',
            price: 0,
            upfrontPrice: 49.99,
            description: 'Coque MagSafe officielle pour iPhone.',
        },
    ];

    getProducts(): Observable<Product[]> {
        return of(this.products).pipe(delay(500));
    }

    getProductsByType(type: Product['type']): Observable<Product[]> {
        return of(this.products.filter(p => p.type === type)).pipe(delay(300));
    }

    // Recherche produits par nom. Latence VARIABLE volontaire (200-800ms) pour
    // rendre observable le choix switchMap vs mergeMap cote effet RxJS.
    searchProducts(query: string): Observable<Product[]> {
        const q = query.trim().toLowerCase();
        const results = q ? this.products.filter(p => p.name.toLowerCase().includes(q)) : [];
        const latency = 200 + Math.floor(Math.random() * 600);
        return of(results).pipe(delay(latency));
    }

}
