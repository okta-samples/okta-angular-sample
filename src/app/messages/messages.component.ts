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

import sampleConfig from '../okta.config';
import { OKTA_AUTH } from '@okta/okta-angular';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface Message {
  date: string;
  text: string;
  index?: number;
}

@Component({
  selector: 'app-messages',
  imports: [AsyncPipe],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  private oktaAuth = inject(OKTA_AUTH);
  private http = inject(HttpClient);
  failed: boolean|null = null;
  messages$: Observable<Message[]> = this.http.get<{messages: Message[]}>(sampleConfig.resourceServer.messagesUrl, {
    headers: {
      Authorization: `Bearer  ${this.oktaAuth.getAccessToken()}`,
    }
  })
  .pipe(
    map(res => res.messages || []),
    map(res => res.map(({date, text}, index: number) => {
      const d = new Date(date);
      return {
        date: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
        text,
        index
      };
    })),
    catchError(err => {
      console.error(err);
      return throwError(() => err);
    })
  );
}
