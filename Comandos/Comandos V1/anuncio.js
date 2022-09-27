const Discord = require('discord.js')

module.exports = {
    name: "anc",
    description: "Envia uma embed customizável ",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'canal',
            description: 'Coloque o nome ou id do canal.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "titulo",
            description: "Titulo da embed",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "desc",
            description: "Descrição da embed",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async (client, interaction) => {
        let channel = interaction.options.getChannel("canal");
        let title = interaction.options.getString("titulo");
        let desc = interaction.options.getString("desc");

        if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({content: "Ixi, cade sua perm?"})

        const embed = new Discord.EmbedBuilder()
        .setColor('Gold')
        .setTitle(`${title}`)
        .setDescription(`${desc}`)
        .setFooter({ text: `Perigo | Todos os Direitos Reservados` })
        channel.send({ embeds: [embed] });

        interaction.reply({ content: `Anuncio postado no canal ${channel}` })
    }
}