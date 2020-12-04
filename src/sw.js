importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/detailMatch.html', revision: '1' },
    { url: '/detailTeam.html', revision: '1' },
    { url: '/index.js', revision: '1' },
    { url: '/sw.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/img/favicon.ico', revision: '1' },
    { url: '/img/arrow-119-32.ico', revision: '1' },
    { url: '/img/bundesliga-logo.png', revision: '1' },
    { url: '/pages/navbar.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/matches.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/pages/upcoming.html', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/pages/reminder.html', revision: '1' }
], { ignoreUrlParametersMatching: [/.*/], });

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/index.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'index'
    })
);

workbox.routing.registerRoute(
    new RegExp('/detailMatch.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'detailMatch'
    })
);

workbox.routing.registerRoute(
    new RegExp('/detailTeam.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'detailTeam'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|ico|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'img',
        plugin: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://crests.football-data.org/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-images',
    })
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/bundesliga-logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});