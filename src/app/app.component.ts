import { AfterViewChecked, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ChatbotService } from './chatbot.service';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

export interface Message {
  sender: string;
  content: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatInputModule, FormsModule, MatFormFieldModule, CommonModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewChecked {
  chatbotService = inject(ChatbotService)
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChild('userInputField') userInputField: ElementRef;

  title = 'ollama-chatbot';

  yourName = 'Me'
  botName = 'Bot-1.0'

  userInput: string = '';
  isInputDisabled: boolean = false;

  messageBuffer: Message[] = [];

  constructor() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
    this.setFocus()
  }

  onSubmit() {
    if (!this.userInput || this.isInputDisabled) return;
    /** Send POST to API here. */
    this.messageBuffer.push({
      sender: this.yourName,
      content: this.userInput
    })

    /** If we receive a response, push them into message buffer here.
     * Set the isInputDisabled to true while waiting for the response
     * and while the bot is responding.
     * 
     * Set it back to false after the response ended.
    */
    this.isInputDisabled = true;
    this.chatbotService.getBotResponse(this.userInput).pipe(take(1)).subscribe({
      next: (response: any) => {
        this.messageBuffer.push({
          sender: this.botName,
          content: response.message
        })
        this.setFocus();
        this.isInputDisabled = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error:', err);
        this.messageBuffer.push({
          sender: this.botName,
          content: 'Server Error. Please try again later.'
        })
        this.setFocus();
        this.isInputDisabled = false;
      }
    })
    
    this.userInput = ''; // Clear the user input after processing
  }

  setFocus() {
    setTimeout(() => {
      this.userInputField.nativeElement.focus();
    }, 0);
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll error:', err);
    }
  }

  onNewChat() {
    this.messageBuffer = [];
    this.userInput = '';
    this.setFocus();
  }

}
