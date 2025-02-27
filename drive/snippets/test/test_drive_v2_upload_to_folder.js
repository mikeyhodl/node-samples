/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const expect = require('expect');
const Helpers = require('./helpers');
const uploadToFolder = require('../drive_v2/file snippets/upload_to_folder');
const createFolder = require('../drive_v2/file snippets/create_folder');

describe('Drive snippets', () => {
  const helpers = new Helpers();

  before(() => {
    helpers.reset();
  });

  after(() => {
    return helpers.cleanup();
  });

  it('should upload to a folder', (async () => {
    const folderId = await createFolder();
    helpers.deleteFileOnCleanup(folderId);
    const file = await uploadToFolder(folderId);
    expect(file).toExist();
    helpers.deleteFileOnCleanup(file);
  }));
});
