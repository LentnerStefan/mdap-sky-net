import bot from './const/bot.js';

import Initializer from './utils/initialize';

let userList = Initializer.initializeData().then((parameters) => {
    console.log("--------\n\n");    
    console.log("Users :\n", parameters.users);
    console.log("--------\n :");
    console.log("Channels :\n", parameters.channels);
});
