Notification.requestPermission();

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
      if (reg.installing)
        console.log('Service worker installing');

      else if(reg.waiting)
        console.log('Service worker installed');

      else if(reg.active)
        console.log('Service worker active');

      initialiseState(reg);
    });  
  } else {
    console.log('Service workers aren\'t supported in this browser.');
  }
});



function initialiseState(reg) {
  // Are Notifications supported in the service worker?
  if (!(reg.showNotification)) {
    console.log('Notifications aren\'t supported on service workers.');
    useNotifications = false;

  } else {
    useNotifications = true;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.log('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.log('Push messaging isn\'t supported.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function(reg) {
    // Do we already have a push message subscription?
    reg.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {

        if ( ! subscription) {
          console.log('Not yet subscribed to Push')
          // We aren't subscribed to push, so set UI
          // to allow the user to enable push
          return;
        }
        
        // initialize status, which includes setting UI elements for subscribed status
        // and updating Subscribers list via push
        console.log(subscription.toJSON());
        var endpoint = subscription.endpoint;
        var key = subscription.getKey('p256dh');
        console.log(key);


        console.log(subscription.getKey('p256dh'));
        console.log(subscription.getKey('auth'));

        // updateStatus(endpoint,key,'init');
      })  
      .catch(function(err) {
        console.log('Error during getSubscription()', err);
      });

      // set up a message channel to communicate with the SW
      var channel = new MessageChannel();
      channel.port1.onmessage = function(e) {
        console.log(e);
        handleChannelMessage(e.data);
      }
      
      mySW = reg.active;
      mySW.postMessage('hello', [channel.port2]);
  });  
}



// var isPushEnabled = false;

// window.addEventListener('load', function() {
//   var pushButton = document.querySelector('.js-push-button');

//   pushButton.addEventListener('click', function() {  
//     if (isPushEnabled) {  
//       unsubscribe();  
//     } else {  
//       subscribe();  
//     }  
//   });

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//       .then(initialiseState);
//   } else {
//     console.warn('Service workers aren\'t supported in this browser.');
//   }
// });



// function initialiseState() {

//   if ( ! ('showNotification' in ServiceWorkerRegistration.prototype)) {
//     console.warn('Notifications aren\'t supported.');
//     return;
//   }

//   Notification.requestPermission();

//   if (Notification.permission === 'denied') {
//     console.warn('The user has blocked notifications.');
//     return;
//   }

//   if ( ! ('PushManager' in window)) {
//     console.warn('Push messaging isn\'t supported.');
//     return;
//   }

//   navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
//     serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true }).getSubscription()
//       .then(function(subscription) {

//         //////////////////////////
//         var pushButton = document.querySelector('.js-push-button');
//         pushButton.disabled = false;
//         //////////////////////////

//         if ( ! subscription) {
//           return;
//         }

//         // sendSubscriptionToServer(subscription);
//         console.log('Subscription: ', subscription);

//         //////////////////////////
//         pushButton.textContent = 'Disable Push Messages';
//         isPushEnabled = true;
//         //////////////////////////
//       })
//       .catch(function(err) {
//         console.warn('Error during getSubscription()', err);
//       });
//   });
// }


function subscribe() {  
  // Disable the button so it can't be changed while  
  // we process the permission request  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.disabled = true;

  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
    serviceWorkerRegistration.pushManager.subscribe()  
      .then(function(subscription) {  
        // The subscription was successful  
        isPushEnabled = true;  
        pushButton.textContent = 'Disable Push Messages';  
        pushButton.disabled = false;

        // TODO: Send the subscription.endpoint to your server  
        // and save it to send a push message at a later date
        return sendSubscriptionToServer(subscription);  
      })  
      .catch(function(e) {  
        if (Notification.permission === 'denied') {  
          // The user denied the notification permission which  
          // means we failed to subscribe and the user will need  
          // to manually change the notification permission to  
          // subscribe to push messages  
          console.warn('Permission for Notifications was denied');  
          pushButton.disabled = true;  
        } else {  
          // A problem occurred with the subscription; common reasons  
          // include network errors, and lacking gcm_sender_id and/or  
          // gcm_user_visible_only in the manifest.  
          console.error('Unable to subscribe to push.', e);  
          pushButton.disabled = false;  
          pushButton.textContent = 'Enable Push Messages';  
        }  
      });  
  });  
}