import { Component } from '@angular/core';

@Component({
    selector: 'app-statement',
    standalone: true,
    template: `
        <section class="statement-box">
            <h2>Enonce du test</h2>
            <p class="intro">
                Application Angular 21 simulant un <strong>panier telecom</strong> (inspire de Bouygues
                Telecom RCBT). L'etat est gere avec <strong>NgRx Store classique</strong>
                (<code>actions</code>, <code>reducer</code>, <code>selectors</code>, <code>effects</code>).
                Le catalogue et la recherche passent par le <code>ProductService</code> (Observables RxJS).
                Vous travaillez dans <code>ExerciseComponent</code> et dans le dossier <code>store/</code>.
            </p>

            <div class="question">
                <h3>Question 1 -- Brancher le catalogue (8 min)</h3>
                <p>
                    Au demarrage, declenchez le chargement des produits : dispatch de
                    <code>CartActions.loadProducts()</code>. L'<strong>effet</strong> <code>loadProducts$</code>
                    appelle deja le service. Affichez la liste via le <strong>selector</strong>
                    <code>selectProducts</code> et le pipe <code>async</code>, avec un etat de chargement.
                    Ajoutez un bouton "Ajouter au panier" qui dispatch <code>addItem</code>.
                </p>
            </div>

            <div class="question">
                <h3>Question 2 -- Compteur et quantites (7 min)</h3>
                <p>
                    Le compteur du panier est faux : ajouter 3 fois le meme produit affiche 1.
                    Corrigez le selector <code>selectItemCount</code> (somme des quantites).
                    Implementez <code>updateQuantity(productId, quantity)</code> dans le reducer, de maniere
                    <strong>immutable</strong> : quantite minimale 1, et si elle passe a 0, l'article est retire.
                    Ajoutez les boutons <strong>+</strong> / <strong>-</strong>.
                </p>
            </div>

            <div class="question">
                <h3>Question 3 -- Recherche produits en RxJS (12 min)</h3>
                <p>
                    Reliez le champ de recherche : chaque saisie dispatch <code>CartActions.search({ query })</code>,
                    affichez <code>selectResults</code>. L'effet <code>search$</code> existe mais est
                    <strong>naif</strong>. Rendez-le correct avec les bons operateurs RxJS :
                </p>
                <ul>
                    <li>ne pas appeler le service a chaque frappe (<code>debounceTime</code>)</li>
                    <li>ignorer les saisies identiques consecutives (<code>distinctUntilChanged</code>)</li>
                    <li>garantir que seule la reponse de la <strong>derniere</strong> saisie compte,
                        meme si une ancienne requete plus lente arrive apres</li>
                </ul>
                <div class="alert alert-info">
                    La latence du service est <strong>variable</strong> : un mauvais operateur de
                    "flattening" fera clignoter/ecraser les resultats. Sachez expliquer votre choix
                    d'operateur.
                </div>
            </div>

            <div class="question">
                <h3>Question 4 -- Reperer et corriger les erreurs (8 min)</h3>
                <p>
                    Le code contient des <strong>erreurs volontaires</strong>. Identifiez-les et corrigez-en
                    le plus possible, en expliquant pourquoi :
                </p>
                <ul>
                    <li>le <code>reducer</code> <code>addItem</code> (purete, immutabilite, effet de bord)</li>
                    <li>une <strong>fuite memoire</strong> dans <code>ExerciseComponent</code></li>
                    <li>les patterns Angular 21 (syntaxe de template, injection, providers inutiles)</li>
                </ul>
            </div>

            <div class="alert alert-warning">
                Priorite aux problemes bloquants et aux choix d'architecture NgRx / RxJS.
                La qualite d'explication compte autant que le code.
            </div>
        </section>
    `,
    styles: [`
        .statement-box { background: #eef6ff; border: 1px solid #b3d4fc; border-radius: var(--radius); padding: 2rem; margin-bottom: 2rem; }
        h2 { margin-top: 0; color: var(--primary); }
        .intro { color: var(--text-light); line-height: 1.6; }
        .intro code { background: #d4e6f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .question { background: white; border-radius: var(--radius); padding: 1.25rem; margin: 1rem 0; border-left: 4px solid var(--primary); }
        .question h3 { margin-top: 0; color: var(--text); font-size: 1rem; }
        .question p { color: var(--text-light); line-height: 1.5; margin-bottom: 0.5rem; }
        .question ul { color: var(--text-light); margin: 0.5rem 0 0.5rem 1.5rem; font-size: 0.95rem; }
        .question code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .alert { padding: 0.75rem 1rem; border-radius: var(--radius); font-size: 0.9rem; margin-top: 1rem; }
        .alert-info { background: #d4edda; color: #155724; }
        .alert-warning { background: #fff3cd; color: #856404; border: 1px solid #ffc107; }
    `]
})
export class StatementComponent {}
