import Initializer from '../utils/initialize';
import Methods from '../utils/methods';
import Prompts from '../utils/prompts';
import Actions from '../const/actions';
import _ from 'lodash';

async function promptUser(userList, channelList) {
    let exit = false;
    while (!exit) {
        let action = await Prompts.promptAction();
        switch (action) {
            // Show user list
            case Actions[0]:
                for (let i = 0; i < userList.length; i++) {
                    console.log(`${userList[i].name} : ${userList[i].id} 
-----------------------`)
                }
                break;
            // Show channel list
            case Actions[1]:
                for (let i = 0; i < channelList.length; i++) {
                    console.log(`${channelList[i].name} : ${channelList[i].id} 
-----------------------`)
                }
                break;
            // Show channel history
            case Actions[2]:
                await Methods.showChannelHistory(userList, channelList);
                break;
            // Send message
            case Actions[3]:
                await Methods.showHallOfFame(userList, channelList);
                break;
            // Send message
            case Actions[5]:
                await Methods.sendMessageTo(userList, channelList);
                break;
            case Actions[6]:
                await Methods.sendImageTo(userList, channelList);
                break;
            case Actions[8]:
                exit = true;
                break;
            console.log('\n\n\n');
        }
    }
}

Initializer.initializeData().then((data) => {
    let users = data.users;
    let channels = data.channels;
    promptUser(users, channels);
});