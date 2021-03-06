var ddrive = require('ddrive')
var ram = require('random-access-memory')
var swarm = require('.')
var Buffer = require('safe-buffer').Buffer

var key = process.argv[2] && new Buffer(process.argv[2], 'hex')
var archive = ddrive(ram, key)
archive.ready(function (err) {
  if (err) throw err
  console.log('key', archive.key.toString('hex'))
  var sw = swarm(archive)
  sw.on('connection', function (peer, type) {
    console.log('got', peer, type) // type is 'webrtc-swarm' or 'discovery-swarm'
    console.log('connected to', sw.connections, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
