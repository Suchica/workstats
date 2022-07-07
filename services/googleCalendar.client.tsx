// Google Calendar API for JavaScript
// The official documentation is here: https://github.com/google/google-api-javascript-client/blob/master/docs/start.md

// Basic parameters
const baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';
const calendarId = 'primary';
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID;
const scope = 'https://www.googleapis.com/auth/calendar.readonly'; // Multiple scopes can be concatenated using space delimitation
let GoogleAuth; // Google Auth object.

// 1. Load the JavaScript client library arg1='client:auth2' which means client and auth2 libraries then does callback arg2.
// The official documentation is here: https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#loading-the-client-library
const handleClientLoad = async () => {
  // console.log('3. gapi.load is starting');
  gapi.load('client:auth2', {
    // gapi.load('client', {
    callback: async () => {
      // console.log('4. initClient is starting');
      await initClient();
      // console.log('14. initClient is finished');
      // await countNumberOfEvents();
    },
    onerror: () => {
      // Handle loading error.
      alert('gapi.client failed to load!');
    },
    timeout: 5000, // 5 seconds.
    ontimeout: () => {
      // Handle timeout.
      alert('gapi.client could not load in a timely manner!');
    }
  });
};

// 2. Initialize the JavaScript client library. If OAuth client ID and scope are provided, this function will load the gapi.auth2 module to perform OAuth.
// The reference is here: https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--
const initClient = async () => {
  // console.log(`{apiKey: ${apiKey}, clientId: ${clientId}, scope: ${scope}}`);
  // console.log('5. gapi.client.init is starting');
  await gapi.client.init({
    apiKey: apiKey, // When using Oauth 2.0, no need to set the API key but, it's a good practice, in case expanding to handle unauthorized requests.
    // discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'], // Unnecessary to specify this, or it saves one network request and reduces application size
    clientId: clientId,
    scope: scope
  });
  // console.log('6. Google API client is initialized by gapi.client.init');

  // Listen for sign-in state changes and listen(listener) passes true to this listener when the user signs in, and false when the user signs out.
  // The reference is here: https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance and https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener
  GoogleAuth = gapi.auth2.getAuthInstance();
  GoogleAuth.isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  // The reference is here: https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinget
  // console.log('7. updateSigninStatus is starting');
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  // console.log('13. updateSigninStatus is finished');
  // authorizeButton.onclick = handleAuthClick;
  // signoutButton.onclick = handleSignoutClick;
};

// Initialize a client where the user's browser receives an auth code from Google and sends it to your server.
// The reference is here: https://developers.google.com/identity/oauth2/web/guides/use-code-model#popup_or_redirect_mode
// const client = google.accounts.oauth2.initCodeClient({
//   client_id: clientId,
//   scope: scope,
//   ux_mode: 'popup',
//   // @ts-ignore for 'response'
//   callback: (response) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', code_receiver_uri, true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     // Set custom header for CSRF
//     xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
//     xhr.onload = () => {
//       console.log('Auth code response: ' + xhr.responseText);
//     };
//     xhr.send('code=' + code);
//   },
// });

// Called when the signed in status changes, to update the UI appropriately.
// After a sign-in, the API is called.
const updateSigninStatus = async (isSignedIn: boolean) => {
  // console.log('8. updateSigninStatus is running');
  if (isSignedIn) {
    // console.log('9. Confirmed user is signed in');
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    const numberOfEvents: number = await countNumberOfEvents();
    // console.log('12. countNumberOfEvents is finished');
    return numberOfEvents;
  } else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
    // console.log('9. Confirmed user is signed out');
    return 0;
  }
};

// 3. Initialize and make the API request.
// The reference is here: https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientrequestargs--
const countNumberOfEvents = async () => {
  // console.log('10. countNumberOfEvents is running');
  const d = new Date();
  const params = {
    maxResults: 250, // Max is 2500
    orderBy: 'startTime', // ascending
    timeMin: new Date(d.setMonth(d.getMonth() - 1)).toISOString(), // 1 month ago
    timeMax: d.toISOString() // today
  };
  // console.log('11. gapi.client.request is starting');
  const response = await gapi.client.request({
    path: `${baseUrl}/calendars/${calendarId}/events`,
    method: 'GET',
    params: params
  });
  if (response.status === 200) {
    console.log(response.result);
    const events = response.result.items;
    const numberOfEvents = events.length;
    // console.log(`11. Number of events: ${numberOfEvents}`);
    return numberOfEvents;
  } else {
    // console.log(`11. Error message: ${response.result.error.message}`);
    return 0;
  }
};

// Sign in the user upon button click with the options specified to gapi.auth2.init().
// The reference is here: https://developers.google.com/identity/sign-in/web/reference#googleauthsignin
// @ts-ignore
const handleAuthClick = (event?) => {
  console.log('handleAuthClick is running');
  gapi.auth2.getAuthInstance().signIn();
};

// Sign out the user upon button click.
// The reference is here: https://developers.google.com/identity/sign-in/web/reference#googleauthsignout
// @ts-ignore
const handleSignoutClick = (event?) => {
  gapi.auth2.getAuthInstance().signOut();
};

export {
  countNumberOfEvents,
  handleAuthClick,
  handleClientLoad,
  handleSignoutClick,
  initClient,
  updateSigninStatus
};
