const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js');
const { serverName, ticketCategory, staffRole } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;

	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('delete')
                    .setPlaceholder('Select to delete the ticket! !')
					.addOptions([
						{
							label: '🗑️ Delete the Ticket',
							description: 'Delete the Ticket',
							value: 'delete',
						}
					])
                );


        let category = ticketCategory;
        let roleStaff = interaction.guild.roles.cache.get(staffRole)

        let TicketChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

        if(interaction.customId === "delete") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
            }
        }

        if (interaction.customId == "select") {
            if (TicketChannel) return interaction.reply({content: '<:4247off:912015084035907665> Error! You already have a ticket open on the server.', ephemeral: true})
            if (interaction.values[0] == "partnership") {
                interaction.guild.channels.create(`Ticket - ${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${category}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const partnership = new MessageEmbed()
                    .setTitle('Ticket for Partnership')
                    .setDescription('Please send your advertisment with your Discord link for Partnership..')
                    .setFooter(`Created by @lezeth0 | https://github.com/lezetho/ticket-bot`)
                    c.send({embeds: [partnership], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
                })

            } else if (interaction.values[0] == "report") {
                interaction.guild.channels.create(`Ticket - ${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${category}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const report = new MessageEmbed()
                    .setTitle('Support Ticket')
                    .setDescription('Please mention the Discord username or Minecraft username you are reporting and include proof.')
                    .setFooter(`Created by @lezeth0 | https://github.com/lezetho/ticket-bot`)
                    c.send({embeds: [report], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Your ticket has been successfully created. <#${c.id}>`, ephemeral: true})
                })

            }
        }
    }
}
