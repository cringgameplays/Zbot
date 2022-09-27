const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: `[🗣️ Contact] Veja os avatares de outros usuarios ou o seu`,
    type: Discord.ApplicationCommandType.ChatInput,
    //ownerOnly: true,
    options: [
        {
            name: 'user',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'The user that you want to steal... I mean, view, their avatar',
            require: false,
        },
    ],
    run: async (client, interaction) => {

        let userMention = interaction.options.getUser('user');
        if (!userMention) {
            userMention = interaction.user;
        }
        let avatar = userMention.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        if (avatar) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`📸 Avatar de ${userMention.username} `)
                .setImage(avatar)
                .setColor('Black')
            

            const button = new Discord.ActionRowBuilder()
                .addComponents([
                    new Discord.ButtonBuilder()
                        .setLabel('Ver no Site')
                        .setURL(avatar)
                        .setEmoji(`🔺`)
                        .setStyle(5)
                ])

            interaction.reply({ 
                embeds: [embed],
                components: [button]
            })
        } else {
            interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setColor('Black')
                    .setDescription(':errado1: Nenhum avatar foi encontrado.')
                ], ephemeral: true
            })
        }
    },
}