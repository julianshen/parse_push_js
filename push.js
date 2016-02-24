var redis = require("redis"),
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
var RedisQueue = require("simple-redis-queue");
var queue = new RedisQueue(client);


var ParsePushAdapter = require('parse-server/lib/Adapters/Push/ParsePushAdapter');

var pushConfig = {
    android: {
        senderId: process.env.GCM_SENDER_ID,
        apiKey: process.env.GCM_API_KEY
    }
};

var parsePushAdapter = new ParsePushAdapter(pushConfig);

queue.on('message', function (queueName, payload) {
    var data = JSON.parse(payload);

    parsePushAdapter.send(data.data, data.installations).then(function(results) {
        //TODO: log push id
    });
});

queue.monitor("parse_push_queue");
