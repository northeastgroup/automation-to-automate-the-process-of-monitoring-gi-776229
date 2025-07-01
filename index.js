```javascript
const zapier = require('zapier-platform-core');

const GitHubTrigger = require('./triggers/github');
const SlackAction = require('./actions/slack');
const AsanaAction = require('./actions/asana');
const GmailAction = require('./actions/gmail');
const GoogleCalendarAction = require('./actions/google_calendar');

const App = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  
  authentication: require('./authentication'),

  beforeRequest: [
    (request, z, bundle) => {
      if (bundle.authData.access_token) {
        request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
      }
      return request;
    },
  ],

  afterResponse: [
    (response, z, bundle) => {
      if (response.status === 401) {
        throw new z.errors.RefreshAuthError();
      }
      return response;
    },
  ],

  resources: {},

  triggers: {
    [GitHubTrigger.key]: GitHubTrigger,
  },

  actions: {
    [SlackAction.key]: SlackAction,
    [AsanaAction.key]: AsanaAction,
    [GmailAction.key]: GmailAction,
    [GoogleCalendarAction.key]: GoogleCalendarAction,
  },

  searches: {},
};

module.exports = App;
```

Please note that this is the main `index.js` file for the Zapier CLI application. The individual triggers and actions for GitHub, Slack, Asana, Gmail, and Google Calendar are not included in this code snippet. They should be implemented in their respective files (`github.js`, `slack.js`, `asana.js`, `gmail.js`, `google_calendar.js`) in the `triggers` and `actions` directories.