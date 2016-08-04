// Notification.requestPermission();

// window.addEventListener('load', function() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js').then(function(reg) {
//       // if (reg.installing)
//       //   console.log('Service worker installing');

//       // else if(reg.waiting)
//       //   console.log('Service worker installed');

//       // else if(reg.active)
//       //   console.log('Service worker active');

//       initialiseState(reg);
//     });  
//   } else {
//     console.log('Service workers aren\'t supported in this browser.');
//   }
// });



// function initialiseState(reg) {
//   if (!(reg.showNotification)) {
//     // console.log('Notifications aren\'t supported on service workers.');
//   }

//   if (Notification.permission === 'denied') {
//     // console.log('The user has blocked notifications.');
//     return;
//   }

//   if (!('PushManager' in window)) {
//     // console.log('Push messaging isn\'t supported.');
//     return;
//   }

//   navigator.serviceWorker.ready.then(function(reg) {
//     reg.pushManager.subscribe({ userVisibleOnly: true })
//       .then(function(subscription) {

//         if (!subscription) {
//           // console.log('Not yet subscribed to Push')
//           return;
//         }

//         var endpoint = subscription.endpoint;

//         console.log(endpoint);
//         // updateStatus(endpoint,key,'init');
//       })  
//       .catch(function(err) {
//         console.log('Error during subscribe()', err);
//       });
//   });  
// }

// function saveEndpoint(endpoint) {
//   // if endpoint.startswith('https://android.googleapis.com/gcm/send'):
//   //   endpointParts = endpoint.split('/')
//   //   registrationId = endpointParts[len(endpointParts) - 1]


//   fetch('/users', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: 'Hubot',
//       login: 'hubot',
//     })
//   }).then(function(res){ 
//     return res.json(); 
//   }).then(function(data){ 
//     alert( JSON.stringify( data ) ) 
//   });
// }


Notification.requestPermission();

window.addEventListener('load', function() {
    if ('serviceWorker' in navigator) {
        console.log('Service worker registration.');

        navigator.serviceWorker.register('/sw.js').then(function(reg) {
            console.log(reg);
            initialiseState(reg);
        });
    } else {
        console.log('Error: Service workers aren\'t supported in this browser.');
    }
});

function initialiseState(reg) {
    if (!(reg.showNotification)) {
        console.log('Error: Notifications aren\'t supported on service workers.');
    }

    if (Notification.permission === 'denied') {
        console.log('Error: The user has blocked notifications.');
        return;
    }

    if (!('PushManager' in window)) {
        console.log('Error: Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager.subscribe({ userVisibleOnly: true })
            .then(function(subscription) {

                if (!subscription) {
                    console.log('Error: Not yet subscribed to Push');
                    return;
                }

                var endpoint = subscription.endpoint;
                console.log(endpoint);

                // saveEndpoint(endpoint);
            }).catch(function(err) {
                console.log('Error: Error during subscribe()', err);
            });
    });
}

function saveEndpoint(endpoint) {
    var key = endpoint.split("/")[5];

    if (key) {
        fetch('/wp-admin/admin-ajax.php?action=saveEndpoint&endpoint=' + key)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                console.log(result);
            })
            .catch (function (error) {
                console.log('Request failed', error);
            });
    }
}