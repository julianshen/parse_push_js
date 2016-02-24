var redis = require("redis"),
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
var RedisQueue = require("simple-redis-queue");
var queue = new RedisQueue(client);

var data = {
   'installations' : [{
    'deviceToken': '<YOUR_DEVICE_TOKEN>',
    'deviceType': 'android',
    'appIdentifier': 'com.parse.starter'
}],
   'data':{
    "data": {
            "title": "Hi there!",
            "alert": "Julian is a cute guy."
          }
   }
}


queue.push("parse_push_queue", data);
client.quit();
