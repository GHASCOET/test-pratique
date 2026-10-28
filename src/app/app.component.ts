import { Component } from '@angular/core';
import { StatementComponent } from '@components/statement/statement.component';
import { ExerciseComponent } from '@components/exercise/exercise.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [StatementComponent, ExerciseComponent],
    template: `
        <header class="header">
            <div class="container">
                <h1>Test Angular - NgRx Store + RxJS</h1>
                <p>Duree : 35 minutes</p>
            </div>
        </header>
        <main class="container">
            <app-statement />
            <app-exercise />
        </main>
        <footer class="footer">
            <div class="container">
                <p>Test technique Angular 21 -- State Management NgRx (Store/Effects) + RxJS</p>
            </div>
        </footer>
    `,
    styles: [`
        :host { display: block; min-height: 100vh; background: var(--bg); }
        .header { background: var(--primary); color: white; padding: 1.5rem 0; }
        .header h1 { margin: 0; font-size: 1.5rem; }
        .header p { margin: 0.25rem 0 0; opacity: 0.8; font-size: 0.9rem; }
        .footer { background: var(--text); color: white; padding: 1rem 0; text-align: center; margin-top: 3rem; }
        .footer p { margin: 0; font-size: 0.85rem; opacity: 0.7; }
        main { padding: 2rem 1rem; max-width: 1200px; margin: 0 auto; }
    `]
})
export class AppComponent {}
