import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ChatPageComponent } from "./chat-page/chat-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ChatPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat-app-ui';
  
}
