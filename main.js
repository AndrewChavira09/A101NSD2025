if ('serviceWorker' in navigator) {
    console.log('Will the service worker register?');

    navigator.serviceWorker.register('sw.js')
        .then(function(reg) {
            console.log('Yes, it did. Scope is:', reg.scope);
        })
        .catch(function(err) {
            console.log('No, it didn\'t. Error:', err);
        });

} else {
    console.log('Service workers are not supported in this browser.');
}



