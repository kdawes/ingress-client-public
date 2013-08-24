# ingress-client

## disclaimer

this code is for educational purposes only. using it on production services will probably be against the service's ToS and get you banned.

## wtf?

ingress-client provides a high level abstraction over nerdlabs/ingress-api-public.
It enhances the JSON gameEntities with functionality for ease of use.

## usage

```javascript
var IngressClient = require('./lib/ingress-client');

var ingressClient = new IngressClient('user@domain.com', 'password');

ingressClient.login(function (err, handshake, client) {
	if (err) {
		console.log('cannot login', err);
		process.exit(1);
	}

	console.log('logged in');



	client.getInventory(function (inventory) {

		inventory.getItems(function (err, items) {
			if (err) {
				console.log('error getting inventory', err);
				process.exit(1);
			}

			console.log('received', items.length, 'items.');
		});

	});
});
```
