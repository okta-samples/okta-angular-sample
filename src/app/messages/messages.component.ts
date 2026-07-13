/*!
 * Copyright (c) 2020-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Component, inject } from '@angular/core';
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
  templateUrl: './messages.component.html'
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
