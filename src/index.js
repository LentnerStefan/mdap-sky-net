

import bot from './const/bot.js';

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
    };
    // TODO// Améliorer la dev experience
    bot.postMessageToUser('stefan.lentner', 'le slackbot est mort, vive le slackbot!', params); 
});