'use strict';
// var SSH = require('simple-ssh');
var request = require('request');


module.exports = {
  metadata: () => ({
    name: 'check',
    timeout : 1000000,
    properties: {
      appName: { required: true, type: 'string' },
      url: { required: true, type: 'string' }
    }
  }),
  invoke: (conversation, done) => {

    const { appName } = conversation.properties();
    const { url } = conversation.properties();

    if(appName && url){
      request.get(url, function (error, response, body) {
          if(error){
              console.log(error);
          }
          console.log('response--------');
          console.log(JSON.stringify(response));
          console.log('body--------');
          console.log(JSON.stringify(body));
          console.log('error--------');
          console.log(JSON.stringify(error));

          // reply
          conversation
          .reply(`status of ${appName} is ${body}`)
          .transition();
          done();
      });

    } else {
         // reply
         conversation
         .reply(`wrong param, app name=${appName} and url=${url}`)
         .transition();
         done();
    }

    
    // ssh
    // var ssh = new SSH({
    //   host: ip,
    //   user: 'opc',
    //   key: key
    // });
    // ssh.exec('kubectl get deployments/myapp', {
    //   out: function(stdout) {
    //       console.log(stdout);
    //       // reply
    //       conversation
    //       .reply(stdout)
    //       .transition();
    //       done();
    //   }
    // }).start();

  }
};
