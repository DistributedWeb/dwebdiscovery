# dwebdiscovery

[![build status](https://travis-ci.org/karissa/dwebdiscovery.svg?branch=master)](http://travis-ci.org/karissa/dwebdiscovery)

Join the p2p swarm for [ddatabase][core], [ddrive][drive], and [dappdb][db] feeds. Uses
[discovery-swarm][swarm] under the hood.

```
npm install dwebdiscovery
```

## Usage

Run the following code in two different places and they will replicate the contents of the given `ARCHIVE_KEY`.

```js
var ddrive = require('ddrive')
var swarm = require('dwebdiscovery')

var archive = ddrive('./database', 'ARCHIVE_KEY')
var sw = swarm(archive)
sw.on('connection', function (peer, type) {
  console.log('got', peer, type) 
  console.log('connected to', sw.connections.length, 'peers')
  peer.on('close', function () {
    console.log('peer disconnected')
  })
})
```

Will use `discovery-swarm` to attempt to connect peers. Uses `dwebx-config` for peer introduction defaults on the server side, which can be overwritten (see below).

The module can also create and join a swarm for a ddatabase feed:

```js
var ddatabase = require('ddatabase')
var swarm = require('dwebdiscovery')

var feed = ddatabase('/feed')
var sw = swarm(feed)
```

The module can also create and join a swarm for a dappdb feed:

```js
var dappdb = require('dappdb')
var swarm = require('dwebdiscovery')

var db = dappdb('/feed', 'ARCHIVE_KEY')
db.on('ready', function() {
  var sw = swarm(db)
})
```

A dappdb database must be ready before attempting to connect to the swarm. When `download` is enabled the swarm will automatically `db.authorize()` all connecting peers.

## API

### `var sw = swarm(archive, opts)`

Join the p2p swarm for the given feed. The return object, `sw`, is an event emitter that will emit a `peer` event with the peer information when a peer is found.

### sw.connections

Get the list of currently active connections.

### sw.close()

Exit the swarm

##### Options

  * `stream`: function, replication stream for connection. Default is `archive.replicate({live, upload, download})`.
  * `upload`: bool, upload data to the other peer?
  * `download`: bool, download data from the other peer?
  * `port`: port for discovery swarm
  * `utp`: use utp in discovery swarm
  * `tcp`: use tcp in discovery swarm

Defaults from dwebx-config can also be overwritten:

  * `dns.server`: DNS server
  * `dns.domain`: DNS domain
  * `dht.bootstrap`: distributed hash table bootstrapping nodes

## See Also
- [mafintosh/ddatabase][core]
- [mafintosh/ddrive][drive]
- [mafintosh/dappdb][db]
- [mafintosh/discovery-swarm][swarm]

## License
ISC

[core]: https://github.com/distributedweb/ddatabase
[drive]: https://github.com/distributedweb/ddrive
[db]: https://github.com/distributedweb/dappdb
[swarm]: https://github.com/distributedweb/discovery-swarm
