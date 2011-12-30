connPort = 1337
connServer = 'localhost'
zmqUri = 'tcp://127.0.0.1:3000'
util = require('util')
net = require('net')
req = require('zmq').socket('req')

req.connect zmqUri
console.log "Requesting from #{zmqUri}"

inServer = net.createServer (inStream)->
  
  inStream.on 'connect', ()->

  inStream.on 'data', (buf)->
    req.send buf

  inStream.on 'end', (buf)->
    console.log 'client disconnected'

  req.on 'message', (msg)->
    inStream.write msg

console.log "Listing on #{connPort}"
inServer.listen connPort, connServer
