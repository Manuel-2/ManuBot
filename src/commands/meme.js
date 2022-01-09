/* eslint-disable indent */
const { memeApiUrl } = require('../../data/memeApi.json');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

function commandMeme(message) {
    const embed = new MessageEmbed();
    try {
        fetch(memeApiUrl)
            .then(promesaFetch => promesaFetch.json())
            .then(content => {
                const permalink = content[0].data.children[0].permalink;
                const memeUrl = `https://reddit.com/${permalink}`;
                const memeImage = content[0].data.children[0].data.url;
                const memeTitle = content[0].data.children[0].data.title;
                embed.setTitle(`${memeTitle}`);
                embed.setColor('RED');
                embed.setImage(memeImage);
                embed.setURL(`${memeUrl}`);
                message.channel.send({ embeds: [embed] });
            });
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = commandMeme;