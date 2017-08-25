import MdapSkyNet from '../const/bot';
import Prompts from './prompts'
import _ from 'lodash';
import moment from 'moment';


function getChannelHistory(channelId, recursive = false,messageList=[],latest=Date.now()) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.channels.history(channelId,{count:500,latest:latest}, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                for (let i = 0; i < info.messages.length; i++) {
                    if (info.messages[i].type === "message") {
                        messageList.push({ usrId: info.messages[i].user, text: info.messages[i].text, date: moment.unix(info.messages[i].ts).format("DD/MM/YYYY HH:mm"), ts: info.messages[i].ts });
                    }
                }
                if(info.has_more && recursive ){
                    let latestMsgTimeStamp=info.messages[info.messages.length-1].ts;
                    resolve(getChannelHistory(channelId,recursive,messageList,latestMsgTimeStamp));
                }
                else{
                    messageList = _.orderBy(messageList, 'ts', 'asc');
                    resolve(messageList);
                }
            }
        })
    });
}

function sendMessage(usrId, text) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.chat.postMessage(usrId, text, { as_user: true }, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(info);
            }
        })
    });
}

async function promptUserAndSendMessage(userList) {
    let userName = await Prompts.promptUser(userList);
    let message = await Prompts.promptMessage();
    let userIndex = _.findIndex(userList, (usr) => usr.name === userName);
    sendMessage(userList[userIndex].id, message);
}

async function showChannelHistory(userList, channelList) {
    let channelName = await Prompts.promptChannel(channelList);
    let channelIndex = _.findIndex(channelList, (chl) => chl.name === channelName);
    let channelHistory = await getChannelHistory(channelList[channelIndex].id,true);
    let err=true;
    let count;
    console.log(`Loaded ${channelHistory.length} messages`);            
    console.log(`Last message was sent ${moment.unix(channelHistory[channelHistory.length-1].ts).format("DD/MM/YYYY HH:mm")}`);   
    while(err){
        count = await Prompts.promptMsgCount();
        if(!isNaN(count))
            {
                err=false;
            }
        else{
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
    for (let i = channelHistory.length-count-1; i < channelHistory.length-1; i++) {
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
    let messageList = await getChannelHistory(channelList[channelIndex].id);
    for (var i = 0; i < userList.length; i++) {
        for (var j = 0; j < messageList.length; j++) {
            if (userList[i].id === messageList[j].usrId) {
                // On regarde si le texte commence par un b, finit par un r, et contient un j au milieu.
                // TODO : Il faut faire mieux (regex)
                if ((messageList[j].text.toUpperCase()[0] === "B" || messageList[j].text.toUpperCase()[messageList[j].text.length] === "R") &&(messageList[j].text.toUpperCase().indexOf('J') !== -1))  {
                    userList[i].stars == undefined ? userList[i].stars = '*' : userList[i].stars += '*';
                }
            }
        }
    }
    userList = _.orderBy(userList, (usr) => usr.stars.length, 'desc');
    userList = _.filter(userList, (usr) => {return usr.stars.length>0});
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


export default { getChannelHistory, sendMessage, promptUserAndSendMessage, showChannelHistory,showHallOfFame}