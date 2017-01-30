var settings = {
  channels: ["#mrdraugtv"],
  server: "irc.twitch.tv",
  botName: "MrDevBot",
  botNick: "MrDevBot",
  admins: ['mrdraugtv'],
  password: "<OAUTH TOKEN>",
}

var user = {
  url: 'https://api.twitch.tv/kraken/users?login=' + settings.admins + '&api_version=5',
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    // 'Accept': 'application/vnd.twitchtv.v3+json',
    'Client-ID': '6yi3gqz43qsqs73infjdthfb3a2e9p',
    'Authorization': settings.password,
  }
}

console.log('******* BOT STARTED *******');
var validators = [];
var startTime = new Date();
var admins = settings.admins;

var irc = require('irc');
var request = require('request');

function callback(error, response, body) {
  console.log("CALLBACK START");
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(response.statusCode);
    info.users.forEach(function(item, index) {
      console.log(item);
      var userId = item._id;
    });
  } else {
    console.log(error);
  }
}

request(user, callback);
// console.log(callback.forEach.userId);


// Create bot
var bot = new irc.Client(settings.server, settings.botName, {
  channels: [settings.channels + " " + settings.password],
  debug: false,
  password: settings.password,
  username: settings.botName
});

bot.addListener("join", function(channel, who) {
  // Welcome in
  console.log(who, "joined chat!");
});

bot.addListener("connect", function(channel, message) {
  console.log('******* BOT CONNECTED *******');
    bot.say(settings.channels[0], "Im here Bitches!");
});

function adminCheck(name){
  for(var i=0; i< settings.admins.length; i++){
    if(admins[i] === name){
      return true;
    }
  }
  return false;
}

bot.addListener('message', function(from, to, text, message) {
  if(text === "!bot") {
    bot.say(to, "Hello! My name is Bot! Im your friend!");
    return;
  }
  if(text === "!dev") {
    bot.say(to, "I was created by @MrDraugTv");
    return;
  }
  if(text === "!v") {
    bot.say(to, "Im on versoin 0.0.1 Pre-Pre-Alpha");
    return;
  }
  textScan(text, to, from);
});

/* Dont Die BITCH! */
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
