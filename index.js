import dotenv from 'dotenv';
import path from 'path';
import ChannelState from './ChannelState.js';
import StreamProcess from './StreamProcess.js';

dotenv.config();

const __dirname = new URL('.', import.meta.url).pathname
const assets = path.join(__dirname, 'app/assets/');
const { API, AUDIO, CHANNEL } = process.env;
let { VIDEO } = process.env;
VIDEO = assets + VIDEO;

const channelState = new ChannelState(CHANNEL);

console.log(API, VIDEO, AUDIO);

let stream = new StreamProcess(API, VIDEO, AUDIO);

setInterval(() => {
    channelState.isLive((isLive) => {
        if (isLive === true) {
            console.log('live')
        } else {
            console.log('Not live. Restarting...');
            stream.stopStream();
            stream = new StreamProcess(API, VIDEO, AUDIO);
        }
    })
}, 300000);