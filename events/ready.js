module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`Lezetho's Ticket Bot | If you see a error, report it to https://github.com/lezetho/ticket-bot/issues or DM me at lezeth0 on Discord!`)
        console.log(` `)
        console.log(`Lezetho's Ticket Bot |  Connected successfully to ${client.user.username}`)

        var compteurStatus = 1
        setInterval(async () => {
            status =  [`https://github.com/lezetho/ticket-bot`]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: "WATCHING",
                  }],
                  status: "dnd"})
        }, 5000);
    }
}
