Notification.requestPermission();

if ("serviceWorker" in navigator) {
  swPromise = navigator.serviceWorker.register("/sw.js")

  swPromise.then(function(registration) {
        return registration.pushManager.subscribe({ userVisibleOnly: true });

    }).then(function(subscription) {
          console.log(subscription);

    }).catch(function(err) {
          console.log("There was a problem with the Service Worker");
          console.log(err);
    });
}