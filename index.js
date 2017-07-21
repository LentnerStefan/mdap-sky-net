var bot = require('./const/bot.js');

//import users from './const/users.js'

// // create a bot
// var bot = new SlackBot({
//     token: 'REPLACE_ME', // replace this by the token you'll find at {ourslackAdress}+/services/
//     name: 'mdap-sky-net'
// });

bot.on('start', function () {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {};
    // TODO// Améliorer la dev experience
    bot.postMessageToUser('stefan.lentner', 'le slackbot est mort, vive le slackbot!', params);
});