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

const {expect} = require('expect');
const Helpers = require('./helpers');
const uploadAppdata = require('../drive_v3/appdata_snippets/upload_appdata');
const listAppdata = require('../drive_v3/appdata_snippets/list_appdata');

describe('Drive snippets', () => {
  const helpers = new Helpers();

  after(() => {
    return helpers.cleanup();
  });

  it('should list files', async () => {
    const id = await uploadAppdata('../files/config.json');
    helpers.deleteFileOnCleanup(id);
    const files = await listAppdata();
    expect(files.length).toBeDefined();
  });
});
