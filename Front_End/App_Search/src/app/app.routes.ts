import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BasesComponent } from './bases/bases.component';
import { SmsComponent } from './sms/sms.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { logauthGuard } from './guards/logauth.guard';


export const routes: Routes = [
    {'path':'home',component: HomeComponent},
    {'path':'login',component: LoginComponent},
    {'path':'bases',component: BasesComponent},
    {'path':'sms',component: SmsComponent},
    {'path': '**',component: NotFoundComponent},


    /*{'path':'home',component: HomeComponent,canActivate: [logauthGuard]},
    {'path':'login',component: LoginComponent},
    {'path':'bases',component: BasesComponent,canActivate: [logauthGuard]},
    {'path':'sms',component: SmsComponent,canActivate: [logauthGuard]},*/
    /*{'path': '**',component: NotFoundComponent}*/
];


