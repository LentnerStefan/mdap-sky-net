import Initializer from '../utils/initialize';
import Methods from '../utils/methods';
import _ from 'lodash';

//let users= await Initializer.promiseUsers();
//console.log('users',users)

Initializer.initializeData().then((data) => {
    let users = data.users;
    let channels = data.channels;
    Methods.getChannelHistory('C5ANMEJG2').then(messageList => {
        for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < messageList.length; j++) {
                if(users[i].usrId===messageList[j].usrId){
                    if(messageList[j].text==="Bonjour"||messageList[j].text==="bonjour"){
                        users[i].stars==undefined?users[i].stars='*':users[i].stars+='*';                     
                    }
                }
            }
        }
        users=_.orderBy(users,(usr)=>usr.stars.length,'desc');
        console.log(`
        -----------------------------
        *            HALL           *
        *             OF            *
        *            FAME           *
        -----------------------------
        `)
        console.log(users);  
        // Uncomment to send message to USER

        // Methods.sendMessage('REPLACE BY USERID','Bonjour cher ami');
        // Methods.sendMessage('REPLACE BY USERID',`
        // -----------------------------
        // *            HALL           *
        // *             OF            *
        // *            FAME           *
        // -----------------------------
        // `);
        // Methods.sendMessage('REPLACE BY USERID',JSON.stringify(users, null, 4));
    });
});


