const { Client, GatewayIntentBits } = require('discord.js');

class Bot {
    constructor(token) {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
        this.token = token;
    }

    start() {
        console.log('Bot starting...');
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });

        this.client.on('messageCreate', (message) => {
            if (message.content === 'ping') {
                message.channel.send('pong');
            }
        });

        this.client.login(this.token);
    }

    sendMessage(channelId, message) {
        this.client.channels.fetch(channelId)
            .then(channel => channel.send(message))
            .catch(console.error);
    }

    sendMessageWithImages(channelId, message, images) {
        this.client.channels.fetch(channelId)
            .then(channel => {
                images.forEach(image => {
                    const file = {
                        attachment: image.buffer,
                        name: image.originalname // or any name you prefer
                    };
                    channel.send({ files: [file] });
                })
                setTimeout(() => {
                    channel.send(message);
                }, 5000);
            })
            .catch(console.error);
    }

    sendImages(channelId, images) {
        this.client.channels.fetch(channelId)
            .then(channel => {
                images.forEach(image => {
                    const file = {
                        attachment: image.buffer,
                        name: image.originalname // or any name you prefer
                    };
                    channel.send({ files: [file] });
                });
            })
            .catch(console.error);
    }
    
}

const myBot = new Bot(process.env.TOKEN);
module.exports = myBot;