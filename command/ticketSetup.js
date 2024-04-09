const {MessageActionRow, MessageSelectMenu} = require('discord.js')
const { serverName } = require('../config.json');
module.exports = {
    name: 'ticket',
    usage: 'template',
    category: "mod",
    description: `Tickets.`,
    async execute(client, message, args) {
		message.delete()
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select the type of ticket to create.')
					.addOptions([
						{
							label: '🤝 | Partner',
							description: 'Open a partnership ticket.',
							value: 'partnership',
						},
						{
							label: '📛 | Report',
							description: 'Open a report ticket ',
							value: 'report',
						},
					]),
			);

        message.channel.send({
            embeds: [{
                title: 'Open ticket',
                description: '**__How To Open A Ticket :__**\nPlease choose the type of ticket you wish to open.',
                color: "BLURPLE",
                footer: {text: `Created by @lezeth0 | https://github.com/lezetho/ticket-bot`}
            }],
            components: [row]
        })
    }
}
