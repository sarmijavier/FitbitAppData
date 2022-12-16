import * as messaging from "messaging";
import { settingsStorage } from "settings";


// Fetch Sleep Data from Fitbit Web API
function fetchSleepData(accessToken)  {
  let date = new Date();
  let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD

  fetch(`https://api.fitbit.com/1/user/-/profile.json`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(err => console.log('[FETCH]: ' + err));
}

// A user changes Settings
settingsStorage.onchange = evt => {
  if (evt.key === "oauth") {
    // Settings page sent us an oAuth token
    let data = JSON.parse(evt.newValue);
    fetchSleepData(data.access_token) ;
  }
};

// Restore previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key && key === "oauth") {
      // We already have an oauth token
      let data = JSON.parse(settingsStorage.getItem(key))
      fetchSleepData(data.access_token);
    }
  }
}

// Message socket opens
messaging.peerSocket.onopen = () => {
  restoreSettings();
};



function fetchAcivateEmergencyButton()  {
  fetch(`http://127.0.0.1:5000/api/v1/activate/emergency`, {
    method: "GET",
  })
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(err => console.log('[FETCH]: ' + err));
}

messaging.peerSocket.addEventListener("message", (evt) => {
  fetchAcivateEmergencyButton()
  console.log('-------------------------')
  console.error(JSON.stringify(evt.data));
});
