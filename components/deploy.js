'use strict';
var request = require('request');
 
module.exports = {
  metadata: () => ({
    name: 'deploy',
    properties: {
      appName: { required: true, type: 'string' },
      version: { required: true, type: 'string' },
      werckerToken: { required: true, type: 'string' },
      pipelineIdV1: { required: true, type: 'string' },
      pipelineIdV2: { required: true, type: 'string' }
    }
  }),
  invoke: (conversation, done) => {
    // perform conversation tasks.
    const { appName } = conversation.properties();
    const { version } = conversation.properties();
    const { werckerToken } = conversation.properties();
    const { pipelineIdV1 } = conversation.properties();
    const { pipelineIdV2 } = conversation.properties();

    conversation.logger().info("appName=" + appName);
    conversation.logger().info("version=" + version);

    // call wercker
    const headers = {};
    headers['Authorization'] = 'Bearer ' + werckerToken; // from wercker

    const body = {
      pipelineId: null
    };
    if (version === '1') {
        body.pipelineId = pipelineIdV1;
    } else if (version === '2') {
        body.pipelineId = pipelineIdV2;
    }

    if(appName && version){
      const options = {
          url: 'https://app.wercker.com/api/v3/runs',
          json: true,
          headers: headers,
          body: body
      };

      request.post(options, function (error, response, body) {
          if(error){
              console.log(error);
          }
          console.log('response--------');
          console.log(JSON.stringify(response));
          console.log('body--------');
          console.log(JSON.stringify(body));
          console.log('error--------');
          console.log(JSON.stringify(error));
      });

      // reply
      conversation
      .reply(`deploying app name=${appName} and version=${version}`)
      .transition();
      done();
    } else {
      // reply
      conversation
      .reply(`wrong param, app name=${appName} and version=${version}`)
      .transition();
      done();
    }
  }
};
