import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
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
export class AppComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  title = 'ollama-chatbot';
  items = Array.from({ length: 50 }, (_, i) => i + 1); // Create an array of numbers from 1 to 50
  yourName = 'You'
  botName = 'Ollama'
  userInput: string = '';

  sentMessages: string[] = [];
  constructor() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSubmit() {
    console.log('User input:', this.userInput)
    /** Send POST to API here. */
    this.sentMessages.push(this.userInput);
    

    this.userInput = ''; // Clear the user input after processing
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll error:', err);
    }
  }

  onNewChat() {
    this.sentMessages = [];
    this.userInput = '';
  }

}
