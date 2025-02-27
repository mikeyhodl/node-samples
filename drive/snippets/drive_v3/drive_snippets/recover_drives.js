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
// [START drive_recover_drives]

/**
 * Find all shared drives without an organizer and add one.
 * @param{string} realUser user ID
 * */
async function recoverDrives(realUser) {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app

  const {GoogleAuth} = require('google-auth-library');
  const {google} = require('googleapis');

  const auth = new GoogleAuth({scopes: 'https://www.googleapis.com/auth/drive'});
  const service = google.drive({version: 'v3', auth});
  const drives = [];
  const newOrganizerPermission = {
    type: 'user',
    role: 'organizer',
    value: 'user@example.com',
  };
  newOrganizerPermission.value = realUser;

  let pageToken = null;
  try {
    const res = await service.drives.list({
      q: 'organizerCount = 0',
      fields: 'nextPageToken, items(id, name)',
      useDomainAdminAccess: true,
      pageToken: pageToken,
    });
    Array.prototype.push.apply(drives, res.data.items);
    res.data.items.forEach(function(drive) {
      console.log('Found shared drive without organizer:', drive.name, drive.id);
      drive.permissions.create({
        resource: newOrganizerPermission,
        fileId: drive.id,
        useDomainAdminAccess: true,
        supportsAllDrives: true,
        fields: 'id',
      });
    });
    pageToken = res.nextPageToken;
    return !!pageToken;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}
// [END drive_recover_drives]

module.exports = recoverDrives;
recoverDrives('xyz@workspacesamples.dev');
