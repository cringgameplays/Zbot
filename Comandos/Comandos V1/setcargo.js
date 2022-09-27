const Discord = require("discord.js")

module.exports = {
    name: 'role',
    description: 'Pegue um cargo com slash',

    run: async (client, interaction) => {

        let cargo = "907036815427518544"
        let cargo_perm = "970050295772086342"

        if (!interaction.member.roles.cache.has(cargo_perm)) {
            return interaction.reply({
                content: `\\❌ **| Você precisa ter o cargo <@&${cargo_perm}> para utilizar este comando.**`,
                ephemeral: true
            })
        } else {

            if (!interaction.channel.permissionsFor(interaction.client.user).has(Discord.PermissionFlagsBits.ManageRoles))
                return interaction.reply({
                    content: `**\\❌ | ${interaction.user}, Eu preciso da permissão \`MANAGE_ROLES\`**`,
                    ephemeral: true,
                })

            interaction.reply({
                content: `\\✔️ ${interaction.user}, Você resgatou o cargo com sucesso!`,
                ephemeral: true
            })

            interaction.member.roles.add(cargo)

            setTimeout(() => {
                interaction.member.roles.remove(cargo)
            }, 5000); //tempo em milissegundos (5000 = 5s)
        }
    }
}