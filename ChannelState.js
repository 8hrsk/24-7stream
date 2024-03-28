import ytubes from "ytubes";

export default class ChannelState {

    constructor(channelNameOrLink) {
        this.channelNameOrLink = channelNameOrLink;
    }

    async isLive(callback) {
        const lives = await ytubes.getChannelLives(this.channelNameOrLink);

        let isLive = false

        for (const stream of lives) {
            if (stream.live === true) {
                isLive = true
            }
        }

        callback(isLive)
    }


}