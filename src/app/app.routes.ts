import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

export const routes: Routes = [

    {path:"",component:LoginPageComponent,pathMatch:'full'},
    {path:"chat",component:ChatPageComponent}
    
];
