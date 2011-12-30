mongoPort = 27017
mongoServer = 'localhost'
zmqUri = 'tcp://127.0.0.1:3000'
util = require('util')
net = require('net')
rep = require('zmq').socket('rep')

outClient = net.connect mongoPort, mongoServer, ()->
  console.log "Writing to #{mongoPort}"

rep.on 'message', (msg)->

  outClient = net.connect(mongoPort, mongoServer)
  outClient.on 'data', (buf)-> rep.send(buf)
  outClient.end msg

rep.bind zmqUri
