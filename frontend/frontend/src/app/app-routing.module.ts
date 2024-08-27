import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MercadopagoComponent } from './components/mercadopago/mercadopago.component';

export const routes: Routes = [
    { path: '', 
      loadComponent: () => import('./home/home.component')},
    
    { path: 'components',
        children: [
            { path: 'login', 
              loadComponent: () => import('./components/login/login.component')},
            { path: 'register',
              loadComponent: () => import('./components/register/register.component')},
        ],
    },

    { path: 'mercadopago', component: MercadopagoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
