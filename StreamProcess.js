import express from 'express'
import { spawn } from 'child_process'

export default class StreamProcess {

    constructor(apikey, video, audio) {
        this.server = express()

        this.ffmpegCommand = [
            'ffmpeg',
            '-stream_loop', '-1',
            '-re',
            '-i', video,
            '-stream_loop', '-1',
            '-re',
            '-i', audio,
            '-vcodec', 'libx264',
            '-pix_fmt', 'yuvj420p',
            '-maxrate', '2048k',
            '-preset', 'ultrafast',
            '-r', '12',
            '-framerate', '1',
            '-g', '50',
            '-crf', '51',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-ar', '44100',
            '-strict', 'experimental',
            '-video_track_timescale', '100',
            '-b:v', '1500k',
            '-f', 'flv',
            `rtmp://a.rtmp.youtube.com/live2/${apikey}`,
          ];

        this.child = spawn(ffmpegCommand[0], ffmpegCommand.slice(1));

        this.child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`); 
        });

        this.child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        this.child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        this.child.on('error', (err) => {
            console.error(`Child process error: ${err}`);
        });

        this.server.use('/', (req, res) => {
            res.send('Your Live Streaming Is All Ready Live')
        })

        this.server.listen(3000, () => {
            console.log('live stream is ready')
        })
    }

    logCommand() {
        console.log(this.ffmpegCommand)
    }

    stopStream() {
        this.child.kill()
    }
}