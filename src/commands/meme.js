/* eslint-disable indent */
const got = require('got');
const Discord = require('discord.js');

function commandMeme(message) {
    const embed = new Discord.MessageEmbed();
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
        const content = JSON.parse(response.body);
        const permalink = content[0].data.children[0].permalink;
        const memeUrl = `https://reddit.com/${permalink}`;
        const memeImage = content[0].data.children[0].data.url;
        const memeTitle = content[0].data.children[0].data.title;
        embed.setTitle(`${memeTitle}`);
        embed.setColor('RED');
        embed.setImage(memeImage);
        embed.setURL(`${memeUrl}`);
        message.channel.send(embed);
    });
}

module.exports = commandMeme;