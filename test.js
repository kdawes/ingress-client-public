
var fs = require('fs');
var IngressClient = require('./lib/ingress-client');
var creds = fs.readFileSync('.credentials').toString('utf8').split(' ');




var ingressClient = new IngressClient(creds[0], creds[1]);


ingressClient.login(function (err, handshake, client) {
    if (err) {
        console.log('cannot login', err);
        process.exit(1);
    }

    console.log('logged in');


    client.getInventory(function (inventory) {

        inventory.get('EMP_BURSTER', { level: 7 }, function (err, items) {
            console.log(err, items);
        });

        // inventory.getItems(function (err, items) {
        //     if (err) {
        //         console.log('error getting items:', err);
        //         process.exit(1);
        //     }

        //     console.log('received', items.length, 'items.');
        // }, true);

    });

    // client.getMap(function (map) {
    //     var cellsAsHex = ["47b8cbce10000000", "47b8cbcf10000000", "47b8cbcc10000000",
    //                      "47b8cbced0000000", "47b8cbcfd0000000", "47b8cbcdd0000000",
    //                      "47b8cbce90000000", "47b8cbcf90000000", "47b8cbcd90000000",
    //                      "47b8cbd1d0000000", "47b8cbce50000000", "47b8cbcf50000000",
    //                      "47b8cbcc50000000", "47b8cbd210000000", "47b8cbce30000000",
    //                      "47b8cbcf30000000", "47b8cbcc30000000", "47b8cbcef0000000",
    //                      "47b8cbcff0000000", "47b8cbcdf0000000", "47b8cbd1f0000000",
    //                      "47b8cbceb0000000", "47b8cbcfb0000000", "47b8cbcdb0000000",
    //                      "47b8cbd030000000", "47b8cbce70000000", "47b8cbcf70000000",
    //                      "47b8cbcc70000000"],
    //         dates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    //                 0, 0, 0, 0, 0, 0, 0],
    //         location = { lat: "030d8ebc", lng: "0067eb1e" };
    //     map.getObjects(cellsAsHex, dates, location, function (err, objects) {
    //         if (err) {
    //             console.log('error getting objects:', err);
    //             process.exit(1);
    //         }

    //         console.log('received', objects.length, 'objects.');
    //     });
    // });

    // client.getPlayer(function (player) {
    //     console.log('player', player.entity);
    // });
});
