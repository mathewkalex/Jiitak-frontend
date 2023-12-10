import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UrlShortenerComponent } from './url-shortener/url-shortener.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'url-shortener',
        pathMatch: 'prefix'
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'create',
        component: CreateUserComponent
    },
    {
        path: 'url-shortener',
        component: UrlShortenerComponent,
        canActivate: [authGuard]
    }
];
