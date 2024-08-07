import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataStoreService } from '../services/data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private dataStore:DataStoreService,private router:Router){}

  
  username:string = "";
  password:string = "";
  responseMessage:string = "";

  ngOnInit(){
    
  }

  login(username:string,password:string){
    console.log(username + " " + password);
    if(username=="devarshi" && password == "12345"){
      this.router.navigate(["/chat"]);
      this.dataStore.loginId = 1;
      this.dataStore.loginUser = "Devarshi";
    }
    if(username=="muskan" && password == "12345"){
      this.router.navigate(["/chat"]);
      this.dataStore.loginId = 2;
      this.dataStore.loginUser = "Muskan";
    }
    if(username=="maya" && password == "12345"){
      this.router.navigate(["/chat"]);
      this.dataStore.loginId = 3;
      this.dataStore.loginUser = "Maya";
    }
    else{
      this.responseMessage = "Invalide credentials";
    }

  }

}
