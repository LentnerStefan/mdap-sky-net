import { WebClient } from '@slack/client'
const bot_token = 'REPLACE_ME'; // replace this by the token you'll find at {ourslackAdress}+/services/
const MdapSkyNet = new WebClient(bot_token);
export default MdapSkyNet;