var SlackBot = require('slackbots');

//import users from './const/users.js';

// create a bot
var bot = new SlackBot({
    token: 'xoxb-215197751904-gMnLEDLSPUD8d0DvwyS5B2AV', // to be replaced
    name: 'mdap-sky-net'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    
    // // define channel, where bot exist. You can adjust it there https://my.slack.com/services 
    // bot.postMessageToChannel('general', 'meow!', params);
    
    // define existing username instead of 'user_name'
    bot.postMessageToUser('paul-antoine', 'le slackbot est mort, vive le slackbot!', params); 

    bot.postMessageToUser('paul-antoine', 'Plus rien de pourra arrêter ce bot!', params); 

    bot.postMessageToUser('stefan.lentner', 'le slackbot est mort, vive le slackbot!', params); 

    bot.postMessageToUser('stefan.lentner', 'Plus rien de pourra arrêter ce bot!', params); 
    // If you add a 'slackbot' property, 
    // you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'meow!', params); 
});