self.addEventListener("push", function(event){
  event.waitUntil(
        self.registration.showNotification("New message")
  );
});

self.addEventListener("notificationclick", function(event){
  event.waitUntil(
        clients.openWindow("https://maxmar.github.io/?test")
  );
});