'use strict';
var SSH = require('simple-ssh');
var path = require('path');

module.exports = {
  metadata: () => ({
    name: 'check',
    timeout : 1000000,
    properties: {
      ip: { required: true, type: 'string' },
      key: { required: true, type: 'string' }
    }
  }),
  invoke: (conversation, done) => {

    const { ip } = conversation.properties();
    const { key } = conversation.properties();

    // ssh
    var ssh = new SSH({
      host: ip,
      user: 'opc',
      key: key
    });
    ssh.exec('kubectl get deployments/myapp', {
      out: function(stdout) {
          console.log(stdout);
          // reply
          conversation
          .reply(stdout)
          .transition();
          done();
      }
    }).start();

  }
};
