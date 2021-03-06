// var _apiURL = '/latest.json',
// 	_errorIconUrl = 'http://hostadvice.com/wp-content/uploads/2013/06/icon-large-features.png';

// self.addEventListener('push', function(event) {
//   event.waitUntil(
//     fetch(_apiURL).then(function(response) {

//       if (response.status !== 200) {
//         // console.log('Looks like there was a problem. Status Code: ' + response.status);
//         throw new Error();
//       }

//       return response.json().then(function(data) {
//         if (data.error || !data.notification) {
//           // console.error('The API returned an error.', data.error);
//           throw new Error();
//         }

//         var title = data.notification.title;
//         var message = data.notification.message;
//         var icon = data.notification.icon;
//         var notificationTag = data.notification.tag;

//         return self.registration.showNotification(title, {
//           body: message,
//           icon: icon,
//           tag: notificationTag
//         });
//       });
//     }).catch(function(err) {
//       // console.error('Unable to retrieve data', err);

//       var title = 'An error occurred';
//       var message = 'We were unable to get the information for this push message';
//       var icon = _errorIconUrl;
//       var notificationTag = 'notification-error';
//       return self.registration.showNotification(title, {
//           body: message,
//           icon: icon,
//           tag: notificationTag
//         });
//     })
//   );
// });

// self.addEventListener('notificationclick', function(event) {
//   // console.log('On notification click: ', event.notification.tag);

//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({
//       type: "window"
//     })
//     .then(function(clientList) {
//       for (var i = 0; i < clientList.length; i++) {
//         var client = clientList[i];

//         if (client.url == '/' && 'focus' in client)
//           return client.focus();
//       }

//       if (clients.openWindow)
//         return clients.openWindow('/');

//     })
//   );
// });


var _apiURL = 'latest.json', //'/wp-admin/admin-ajax.php?action=latestNotification',
    _errorIconUrl = 'error.png';

self.addEventListener('push', function(event) {
    event.waitUntil(
        fetch(_apiURL).then(function(response) {

            if (response.status !== 200) {
                // console.log('Looks like there was a problem. Status Code: ' + response.status);
                throw new Error();
            }

            return response.json().then(function(data) {
                if (data.error || !data.notification) {
                    // console.error('The API returned an error.', data.error);
                    throw new Error();
                }

                var title = data.notification.title,
                    message = data.notification.message,
                    icon = data.notification.icon,
                    notificationTag = data.notification.tag;

                return self.registration.showNotification(title, {
                    body: message,
                    icon: icon,
                    tag: notificationTag
                });
            });
        }).catch(function(err) {
            // console.error('Unable to retrieve data', err);

            var title = 'An error occurred',
                message = 'We were unable to get the information for this push message',
                icon = _errorIconUrl,
                notificationTag = 'notification-error';

            return self.registration.showNotification(title, {
                body: message,
                icon: icon,
                tag: notificationTag
            });
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    // console.log('On notification click: ', event.notification.tag);

    event.notification.close();

    event.waitUntil(
        clients.matchAll({
                type: "window"
            }).then(function(clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];

                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }

                if (clients.openWindow)
                    return clients.openWindow('/');
            })
    );
});