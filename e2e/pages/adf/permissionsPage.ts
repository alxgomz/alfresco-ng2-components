/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
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

import { element, by } from 'protractor';

import { Util } from '../../util/util';
import { DataTablePage } from './dataTablePage';

export class PermissionsPage {

    addPermissionButton = element(by.css("button[data-automation-id='adf-add-permission-button']"));
    addPermissionDialog = element(by.css('adf-add-permission-dialog'));
    searchUserInput = element(by.id('searchInput'));
    searchResults = element.all(by.id('adf-search-results-content')).first();
    addButton =  element(by.id('add-permission-dialog-confirm-button'));
    permissionInheritedButton = element.all(by.css("div[class='adf-inherit_permission_button'] button")).first();
    permissionInheritedButtonText = this.permissionInheritedButton.element(by.css('span'));
    noPermissions = element(by.css('div[id="adf-no-permissions-template"]'));

    checkAddPermissionButtonIsDisplayed() {
        Util.waitUntilElementIsVisible(this.addPermissionButton);
    }

    clickAddPermissionButton() {
        Util.waitUntilElementIsClickable(this.addPermissionButton);
        return this.addPermissionButton.click();
    }

    checkAddPermissionDialogIsDisplayed() {
        Util.waitUntilElementIsVisible(this.addPermissionDialog);
    }

    checkSearchUserInputIsDisplayed() {
        Util.waitUntilElementIsVisible(this.searchUserInput);
    }

    searchUserOrGroup(name) {
        Util.waitUntilElementIsClickable(this.searchUserInput);
        return this.searchUserInput.sendKeys(name);
    }

    checkResultListIsDisplayed() {
        Util.waitUntilElementIsVisible(this.searchResults);
    }

    clickUserOrGroup(name) {
        let userOrGroupName = element(by.cssContainingText('mat-list-option .mat-list-text', name));
        Util.waitUntilElementIsVisible(userOrGroupName);
        userOrGroupName.click();
        Util.waitUntilElementIsVisible(this.addButton);
        return this.addButton.click();
    }

    checkUserOrGroupIsAdded(name) {
        let userOrGroupName = element(by.css('div[data-automation-id="text_' + name + '"]'));
        Util.waitUntilElementIsVisible(userOrGroupName);
    }

    checkPermissionInheritedButtonIsDisplayed() {
        Util.waitUntilElementIsVisible(this.permissionInheritedButton);
    }

    clickPermissionInheritedButton() {
        Util.waitUntilElementIsClickable(this.permissionInheritedButton);
        return this.permissionInheritedButton.click();
    }

    checkNoPermissionsIsDisplayed() {
        Util.waitUntilElementIsVisible(this.noPermissions);
    }

    getPermissionInheritedButtonText() {
        Util.waitUntilElementIsClickable(this.permissionInheritedButton);
        return this.permissionInheritedButtonText.getText();
    }

    checkPermissionsDatatableIsDisplayed() {
        return new DataTablePage(element(by.css('[class*="adf-datatable-permission"]')));
    }

}
