import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatInputModule, FormsModule, MatFormFieldModule, CommonModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ollama-chatbot';
  items = Array.from({ length: 50 }, (_, i) => i + 1); // Create an array of numbers from 1 to 50
}
