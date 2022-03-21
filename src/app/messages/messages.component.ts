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
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import sampleConfig from '../app.config';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

interface Message {
  date: string;
  text: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  failed!: Boolean;
  messages: Message[] = [];

  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth, private http: HttpClient) {
    this.messages = [];
  }

  ngOnInit() {
    const accessToken = this.oktaAuth.getAccessToken();
    this.http.get(sampleConfig.resourceServer.messagesUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe({
      next: (data: any) => {
        let index = 1;
        const messages = data.messages.map((message: Message) => {
          const date = new Date(message.date);
          const day = date.toLocaleDateString();
          const time = date.toLocaleTimeString();
          return {
            date: `${day} ${time}`,
            text: message.text,
            index: index++
          };
        });
        [].push.apply(this.messages, messages);
      }, error: (err) => {
        console.error(err);
        this.failed = true;
      }
    });
  }
}
