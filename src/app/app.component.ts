import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
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
import { Subject } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';

export interface Message {
  role: string;
  content: string;
}

export interface Response {
  model: string;
  created_at: string;
  message: Message;
  done: boolean;
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
export class AppComponent implements AfterViewChecked, OnDestroy {
  chatbotService = inject(ChatbotService)
  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  @ViewChild('userInputField') userInputField: ElementRef;

  title = 'ollama-chatbot';

  yourName = 'You'
  botName = 'Dreamy IT'

  userInput: string = '';
  isInputDisabled: boolean = false;
  isMessageStreaming: boolean = false

  messageBuffer: Message[] = [];
  componentDestroyed$: Subject<void> = new Subject();
  streamMessage: string = '';

  constructor() {}

  ngAfterViewChecked() {
    // this.scrollToBottom();
    this.setFocus()
  }

  onSubmit() {
    if (this.userInput.trim() === "" || this.isInputDisabled) return;

    this.isInputDisabled = true;
    /** Send POST to API here. */
    this.messageBuffer.push({
      role: 'user',
      content: this.userInput
    })

    this.getStreamResponse()
    this.userInput = ''; // Clear the user input after processing
    this.scrollToBottom();
  }

  getStreamResponse() {
    this.chatbotService.getStreamResponse(this.messageBuffer).subscribe({
      next: (response: Response) => {
        console.log('Stream response:', response)
        /** Disable Input while streaming, and display stream messag */
        this.streamMessage += response.message.content;
        this.isMessageStreaming = response.done
        this.scrollToBottom()
      },
      error: (error) => console.error('Error: ', error),
      complete: () => {
        /** Stream completed: */
        this.isInputDisabled = false;
        this.messageBuffer.push({ 
          role: 'assistant',
          content: this.streamMessage
        })
        this.streamMessage = ''
        this.scrollToBottom()
      }
    });
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


  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.componentDestroyed$.complete();
  }

}
