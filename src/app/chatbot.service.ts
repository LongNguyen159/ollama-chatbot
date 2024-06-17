import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message, Response } from './app.component';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly API_URL = 'http://localhost:8000';

  private ollamaApiUrl = 'https://ollama.project-insanity.de/api/chat';
  constructor(private http: HttpClient) { }

  getBotResponse(userInput: string) {
    const body = {
      message: userInput
    }
    return this.http.post(`${this.API_URL}/message`, body);
  }

  /** Get Stream JSON from AI API */
  getStreamResponse(message: Message[]): Observable<any> {
    const body = {
      model: 'DreamITChatbot',
      messages: message,
      stream: true
    }

    const subject = new Subject<any>();

    fetch(this.ollamaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      function read() {
        reader?.read().then(({ done, value }) => {
          if (done) {
            subject.complete();
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          lines.forEach(line => subject.next(JSON.parse(line)));
          read();
        });
      }

      read();
    }).catch(error => subject.error(error));

    return subject.asObservable();
  }
}

