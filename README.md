# Test Angular 21 — NgRx Store (classique) + RxJS

Test technique de **35 min** pour évaluer la **vraie** maîtrise de NgRx et RxJS
(et non le name-dropping). Appli : panier télécom (inspiré de Bouygues RCBT),
état géré en **NgRx Store classique** (actions / reducer / selectors / effects),
catalogue et recherche via le `ProductService` (Observables RxJS).

> Évaluateur : voir **`GUIDE_EVALUATEUR.md`** (correction + grille + pièges).

## Démarrer

```bash
pnpm install
pnpm start
```

→ http://localhost:4200 (le `.stackblitzrc` lance `ng serve` sur StackBlitz).

## Les 4 questions (dans `ExerciseComponent` et `store/`)

1. **Brancher le catalogue** : dispatch `loadProducts`, afficher via `selectProducts` + pipe `async`, bouton "Ajouter au panier".
2. **Compteur & quantités** : corriger `selectItemCount` (somme des quantités), implémenter `updateQuantity` **immutable** (+ / −, min 1, 0 ⇒ retiré).
3. **Recherche RxJS** : relier le champ, rendre l'effet `search$` correct avec `debounceTime` + `distinctUntilChanged` + **`switchMap`** (latence service variable).
4. **Repérer les erreurs** : reducer impur/muté, fuite mémoire (subscriptions non libérées), patterns Angular 21 (`@for`/`@if`, `inject()`, providers inutiles).

## Fichiers clés

| Fichier | Rôle |
| --- | --- |
| `src/app/store/cart.actions.ts` | actions (createActionGroup) |
| `src/app/store/cart.reducer.ts` | reducer **à compléter/corriger** |
| `src/app/store/cart.selectors.ts` | selectors (dont le compteur à corriger) |
| `src/app/store/cart.effects.ts` | effets : `loadProducts$` (OK), `search$` **à corriger** |
| `src/app/components/exercise/exercise.component.ts` | composant **à compléter** (TODO Q1→Q3) |
| `src/app/services/product.service.ts` | `getProducts()` + `searchProducts(query)` (latence variable) |
| `GUIDE_EVALUATEUR.md` | correction + barème (ne pas donner au candidat) |

Durée annoncée : **35 minutes**.
