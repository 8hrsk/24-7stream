import youtube from "youtube-live-streaming";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const __dirname = new URL('.', import.meta.url).pathname
const assets = path.join(__dirname, 'app/assets/');
const { API, AUDIO } = process.env;
let { VIDEO } = process.env;
VIDEO = assets + VIDEO;
console.log(API, VIDEO, AUDIO);

youtube(API, VIDEO, AUDIO);

setInterval(() => {
    console.log('loop');
    youtube(API, VIDEO, AUDIO)
}, 43200000);