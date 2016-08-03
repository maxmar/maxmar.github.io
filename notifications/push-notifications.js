Notification.requestPermission();

window.addEventListener('load', function() {
    if ('serviceWorker' in navigator) {
        console.log('Service worker registration.');

        navigator.serviceWorker.register('/notifications/sw.js').then(function(reg) {
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