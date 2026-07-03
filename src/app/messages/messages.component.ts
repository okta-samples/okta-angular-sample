import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

const MESSAGES_URL = 'http://localhost:8000/api/messages';

interface Message {
  date: string;
  text: string;
  index?: number;
}

@Component({
  selector: 'app-messages',
  imports: [AsyncPipe],
  templateUrl: './messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  private http = inject(HttpClient);
  readonly messages$: Observable<Message[] | null> = this.http.get<{ messages: Message[] }>(MESSAGES_URL)
  .pipe(
    map(res => res.messages || []),
    map(res => res.map(({ date, text }, index: number) => {
      const d = new Date(date);
      return {
        date: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
        text,
        index
      };
    })),
    catchError(() => of(null))
  );
}
