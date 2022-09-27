const Discord = require('discord.js')

module.exports = {
    name: 'painel-sugestao',
    description: '[📩 Admins] Envie o painel de sugestão.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'canal',
            description: 'Selecione um canal de texto.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let channel = interaction.options.getChannel('canal')

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
            return interaction.reply({
                content: `**❌ | ${interaction.user}, Você precisa da permissão \`ADMNISTRATOR\` para usar este comando!**`,
                ephemeral: true,
            })

        if (!channel.send)
            return interaction.reply({
                content: `❌ | ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.`,
                ephemeral: true,
            })

        interaction.reply({
            content: `${interaction.user}, O painel de sugestão foi enviado em ${channel} com sucesso.`,
            ephemeral: true,
        })

        channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setDescription(`*Olá usuários cliquem no botão abaixo para enviar uma sugestão para o servidor.*`)
                    .setColor('Gold')
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                    .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('botao_modal')
                            .setLabel('Sugestão')
                            .setEmoji('💡')
                            .setStyle(2)),
            ]
        })
    }
}