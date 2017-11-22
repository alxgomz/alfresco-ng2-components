/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';

import { MaterialModule } from './material.module';

import { ProcessListModule } from './process-list/process-list.module';
import { TaskListModule } from './task-list/task-list.module';
import { AppsListModule } from './app-list/apps-list.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentModule } from './attachment/attachment.module';
import { PeopleModule } from './people/people.module';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        CommentsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ProcessListModule,
        TaskListModule,
        AppsListModule,
        AttachmentModule,
        PeopleModule
    ],
    providers: [
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'adf-process-services',
                source: 'assets/adf-process-services'
            }
        }
    ],
    exports: [
        CommonModule,
        CommentsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ProcessListModule,
        TaskListModule,
        AppsListModule,
        AttachmentModule,
        PeopleModule,
        MaterialModule
    ]
})
export class ProcessModule {
}
