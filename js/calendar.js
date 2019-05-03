

// Client ID and API key from the Developer Console
var CLIENT_ID = '869430548922-b9jromtoa1qmt8l3jol1ahopjeea90l2.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBTnL_MrIIX7Ta5nuWjEHLMqY2rcXiA7N0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementsByClassName('sign-in');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
gapi.client.init({
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
}).then(function () {
  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  authorizeButton.onclick = handleAuthClick;
  signoutButton.onclick = handleSignoutClick;
});
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
if (isSignedIn) {
    authorizeButton.style.display = 'none';
    addEvents();
} else {
  authorizeButton.style.display = 'block';
}
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
gapi.auth2.getAuthInstance().signOut();
}

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
var pre = document.getElementById('content');

function appendPre(message) {
pre.style.display = 'block';
var textContent = document.createTextNode(message + '\n');
pre.appendChild(textContent);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
gapi.client.calendar.events.list({
  'calendarId': 'primary',
  'timeMin': (new Date()).toISOString(),
  'showDeleted': false,
  'singleEvents': true,
  'maxResults': 10,
  'orderBy': 'startTime'
}).then(function(response) {
  var events = response.result.items;
  appendPre('Upcoming events:');

  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      appendPre(event.summary + ' (' + when + ')')
    }
  } else {
    appendPre('No upcoming events found.');
  }
});
}

    
function addEvents(){
    var location = localStorage.getItem("location");
    var start = localStorage.getItem("start");
    var end = localStorage.getItem("end");
    var title = localStorage.getItem("title");
    var desc = localStorage.getItem("desc");
var resource = {
  "summary": title,
    "description": desc,
  "location": location,
  "start": {
    "dateTime": ""+start+"+08:00"
  },
  "end": {
    "dateTime": ""+end+"+08:00"
    }
  };
var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': resource
});
request.execute(function(resp) {
  console.log(resp);
    handleSignoutClick();
    window.open(resp.htmlLink);
    pre.style.display = 'none';

});
}
    
