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

export interface Message {
  sender: string;
  content: string;
}
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

  yourName = 'You'
  botName = 'Ollama'

  userInput: string = '';
  isInputDisabled: boolean = false;

  messageBuffer: Message[] = [];

  constructor() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
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
    // this.messageBuffer.push({
    //   sender: this.botName,
    //   content: 'I am a bot. I am responding to your message. Please wait...'
    // })
    setTimeout(() => {
      this.messageBuffer.push({
        sender: this.botName,
        content: 'I am up and available! Ask me anything!'
      })
      this.isInputDisabled = false;
    }, 500);
    

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
    this.messageBuffer = [];
    this.userInput = '';
  }

}
