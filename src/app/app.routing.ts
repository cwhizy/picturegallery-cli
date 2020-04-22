import { Routes, RouterModule } from '@angular/router';

import { MainfeedComponent } from './mainfeed';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: MainfeedComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);