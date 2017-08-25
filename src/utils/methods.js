import Prompts from './prompts'
import Calls from './calls';
import _ from 'lodash';
import moment from 'moment';

async function showChannelHistory(userList, channelList) {
    let channelName = await Prompts.promptChannel(channelList);
    let channelIndex = _.findIndex(channelList, (chl) => chl.name === channelName);
    let channelHistory = await Calls.getChannelHistory(channelList[channelIndex].id, true);
    let err = true;
    let count;
    console.log(`Loaded ${channelHistory.length} messages`);
    console.log(`Last message was sent ${moment.unix(channelHistory[channelHistory.length - 1].ts).format("DD/MM/YYYY HH:mm")}`);
    while (err) {
        count = await Prompts.promptMsgCount();
        if (!isNaN(count)) {
            err = false;
        }
        else {
            console.log('Try again...')
        }
    }
    console.log(`
    ****************
    *              *
    *    CHANNEL   *
    *    HISTORY   *
    *              *
    ****************

`)
    for (let i = channelHistory.length - count - 1; i < channelHistory.length - 1; i++) {
        let userIndex = _.findIndex(userList, (usr) => usr.id === channelHistory[i].usrId);
        let userName = userList[userIndex].name
        console.log(`${channelHistory[i].date} : ${userName} 
${channelHistory[i].text}
-----------------------`)
    }

}

async function showHallOfFame(userList, channelList) {
    let channelName = await Prompts.promptChannel(channelList);
    let channelIndex = _.findIndex(channelList, (chl) => chl.name === channelName);
    let messageList = await Calls.getChannelHistory(channelList[channelIndex].id);
    for (var i = 0; i < userList.length; i++) {
        for (var j = 0; j < messageList.length; j++) {
            if (userList[i].id === messageList[j].usrId) {
                // On regarde si le texte commence par un b, finit par un r, et contient un j au milieu.
                // TODO : Il faut faire mieux (regex)
                if ((messageList[j].text.toUpperCase()[0] === "B" || messageList[j].text.toUpperCase()[messageList[j].text.length] === "R") && (messageList[j].text.toUpperCase().indexOf('J') !== -1)) {
                    userList[i].stars == undefined ? userList[i].stars = '*' : userList[i].stars += '*';
                }
            }
        }
    }
    userList = _.orderBy(userList, (usr) => usr.stars.length, 'desc');
    userList = _.filter(userList, (usr) => { return usr.stars.length > 0 });
    console.log(`
    ****************
    *              *
    *    HALL OF   *
    *     FAME     *
    *              *
    ****************

`)
    for (let i = 0; i < userList.length; i++) {
        console.log(`${userList[i].name} : ${userList[i].stars} 
-----------------------`)
    }
}



async function sendMessageTo(userList,channelList) {
    let choice = await Prompts.promptChannelsOrUsers();
    // channel
    let receipientId;
    if (choice==="channels"){
        let channelName= await Prompts.promptChannel(channelList);
        receipientId=channelList[_.findIndex(channelList, (chl) => chl.name === channelName)].id
    }
    // users 
    else{
        let userName = await Prompts.promptUser(userList);
        receipientId=userList[_.findIndex(userList , (usr) => usr.name === userName)].id    
    }
    let message = await Prompts.promptMessage();
    Calls.sendMessage(receipientId, message);
}

async function sendImageTo(userList,channelList) {
    let choice = await Prompts.promptChannelsOrUsers();
    let receipientId;
    if (choice==="channels"){
        let channelName= await Prompts.promptChannel(channelList);
        receipientId=channelList[_.findIndex(channelList, (chl) => chl.name === channelName)].id
    }
    // users 
    else{
        let userName = await Prompts.promptUser(userList);
        receipientId=userList[_.findIndex(userList , (usr) => usr.name === userName)].id    
    }
    let message = await Prompts.promptMessage();
    let imageLink= await Prompts.promptImageLink();
    await Calls.sendImage(receipientId,message,imageLink);
}

export default { sendMessageTo, showChannelHistory, showHallOfFame, sendImageTo }