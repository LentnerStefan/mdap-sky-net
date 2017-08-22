import bot from '../const/bot';
import lodash from 'lodash';

const initializeData = () => {
    const promiseUsers = bot.getUsers().then((users) => {
        console.log('Fetching the user list...')
        let userList = {};
        for (var eachuser in users.members) {
            userList[users.members[eachuser].name] = { id: users.members[eachuser].id }
        }
        return userList;
    },()=>{
        console.log('Something went wrong while fetching the user List');
    });

    const promiseChannel = bot.getChannels().then((channels) => {
        let channelList = {};
        console.log('Fetching the channel list...')
        for (var eachChannel in channels.channels) {
            channelList[channels.channels[eachChannel].name] = { id: channels.channels[eachChannel].id }
        }
        return channelList;
    },()=>{
        console.log('Something went wrong while fetching the channel List');
    });
    return Promise.all([promiseUsers,promiseChannel]).then(x => ( { users: x[0], channels: x[1] }),(err)=>{
        console.log('error',err);
    });
}

export default { initializeData };

