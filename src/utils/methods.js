import MdapSkyNet from '../const/bot';

function getChannelHistory(channelId) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.channels.history(channelId, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                let messageList = [];
                for (var i = 0; i < info.messages.length; i++) {
                    if (info.messages[i].type === "message") {
                        messageList.push({ usrId: info.messages[i].user, text: info.messages[i].text });
                    }
                }
                resolve(messageList);
            }
        })
    });
}

function sendMessage(usrId,text) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.chat.postMessage(usrId,text,{as_user:true}, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(info);
            }
        })
    });
}
export default { getChannelHistory,sendMessage }