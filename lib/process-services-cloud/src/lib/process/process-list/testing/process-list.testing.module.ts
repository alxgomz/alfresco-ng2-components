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
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProcessListCloudModule } from '../process-list-cloud.module';
import {
    AlfrescoApiService,
    AlfrescoApiServiceMock,
    AppConfigService,
    AppConfigServiceMock,
    StorageService,
    LogService,
    TranslationService,
    TranslationMock,
    UserPreferencesService,
    ContextMenuModule,
    CoreModule
} from '@alfresco/adf-core';
@NgModule({
    imports: [
        HttpClientModule,
        NoopAnimationsModule,
        ProcessListCloudModule,
        CoreModule.forRoot(),
        ContextMenuModule
    ],
    providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock },
        { provide: TranslationService, useClass: TranslationMock },
        StorageService,
        LogService,
        UserPreferencesService
    ]
})
export class ProcessListCloudTestingModule { }
