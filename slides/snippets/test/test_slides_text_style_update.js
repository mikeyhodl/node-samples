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
const SlidesTextStyleUpdate = require('../slides_text_style_update');

describe('Presentation snippets', () => {
  const helpers = new Helpers();

  after(() => {
    return helpers.cleanup();
  });

  it('should TextStyleUpdate', (async () => {
    const presentationId = await helpers.createTestPresentation();
    const pageIds = await helpers.addSlides(presentationId, 1, 'BLANK');
    const pageId = pageIds[0];
    const boxId = await helpers.createTestTextbox(presentationId, pageId);
    const response = await SlidesTextStyleUpdate.textStyleUpdate(presentationId, boxId);
    expect(3).toEqual(response.replies.length);
  }));
});
