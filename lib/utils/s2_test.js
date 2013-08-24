var S2 = require('./s2');


var pos = { lat: 53.570113, lng: 9.954555 };

// var range = 0.003;
// var step = 0.0002;
// var cellIDs = [];

// for (var lat = pos.lat - range; lat < pos.lat + range; lat += step) {
//     for (var lng = pos.lng - range; lng < pos.lng + range; lng += step) {
//         var cell = S2.posToCellID(lat, lng);
//         cell = S2.cellIDParent(cell, 16);
//         if (cellIDs.indexOf(cell) > -1) { continue; }
//         cellIDs.push(cell);
//     }
// }

// var cellsAsHex = cellIDs.map(function (cell) { return cell.toString(16); });

// console.log(cellsAsHex);
// output: [ '50000000', '10000000' ]
// expected: [ "47b18c2b50000000", "47b18c2a50000000", ...{more} ]

console.log(S2.posToCellID(pos.lat, pos.lng));