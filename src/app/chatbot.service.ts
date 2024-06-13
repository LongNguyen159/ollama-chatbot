import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly API_URL = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getBotResponse(userInput: string) {
    const body = {
      message: userInput
    }
    return this.http.post(`${this.API_URL}/message`, body);
  }
}
