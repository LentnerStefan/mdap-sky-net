import MdapSkyNet from '../const/bot';
import _ from 'lodash';
import moment from 'moment';

function getChannelHistory(channelId, recursive = false, messageList = [], latest = Date.now()) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.channels.history(channelId, { count: 500, latest: latest }, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                for (let i = 0; i < info.messages.length; i++) {
                    if (info.messages[i].type === "message") {
                        messageList.push({ usrId: info.messages[i].user, text: info.messages[i].text, date: moment.unix(info.messages[i].ts).format("DD/MM/YYYY HH:mm"), ts: info.messages[i].ts });
                    }
                }
                if (info.has_more && recursive) {
                    let latestMsgTimeStamp = info.messages[info.messages.length - 1].ts;
                    resolve(getChannelHistory(channelId, recursive, messageList, latestMsgTimeStamp));
                }
                else {
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

function sendImage(usrId,text,imageLink) {
    return new Promise(function (resolve, reject) {
        MdapSkyNet.chat.postMessage(usrId,"", {
            as_user: true, attachments: [
                {
                    text: text,
                    image_url: imageLink
                }
            ]
        }, (err, info) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(info);
            }
        })
    });
}


export default { getChannelHistory, sendMessage, sendImage }