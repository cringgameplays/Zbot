const Discord = require("discord.js");
const ms = require("ms");
const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });


    client.on('interactionCreate', async interaction => {
      //botao
      if (interaction.isButton()) {
        if (interaction.customId.startsWith("botao_modal")) {
          const modal = new Discord.ModalBuilder()
            .setCustomId('modal_sugestao')
            .setTitle(`Olá usuário, Nos diga qual é a sua sugestão.`)
          const sugestao3 = new Discord.TextInputBuilder()
            .setCustomId('sugestão')
            .setLabel('Qual sua sugestão?')
            .setStyle(Discord.TextInputStyle.Paragraph)
    
          const firstActionRow = new Discord.ActionRowBuilder().addComponents(sugestao3);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal);
    
          interaction.followUp({
            content: `${interaction.user}, Não abuse dessa função, caso contrario poderá e irá resultar em banimento.`,
            ephemeral: true
          })
    
        }
      }
      //
    
      if (!interaction.isModalSubmit()) return;
      if (interaction.customId === 'modal_sugestao') {
        const moment = require("moment")
        let channel = client.channels.cache.get('1024099238210183231') //canal para o envio da sugestão.
        const sugestao2 = interaction.fields.getTextInputValue('sugestão');
    
        interaction.reply({
          content: `<:check:1007452676193259550> | ${interaction.user}, Sua sugestão foi enviada com sucesso!`, ephemeral: true
        })
    
        channel.send({
          embeds: [new Discord.EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: `👤 - ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setDescription(`Horário da sugestão:
    <t:${moment(interaction.createdTimestamp).unix()}>(<t:${parseInt(interaction.createdTimestamp / 1000)}:R>)
    
    <:user:1007453974351315005> - Sobre o usuário:
    
    <:id:1007455665297567744> - ID:
    > (\`${interaction.user.id}\`)
    <:icons_ping:1004840196241625139> - Menção:
    > ${interaction.user}
    <:icons_Person:1004156383496777769> - Name And #:
    > ${interaction.user.tag}
    
    \\✏️ - Sugestão:\n\`\`\`${sugestao2}\`\`\``)
          ]
        })
      }
    })
    
    //autoreact mensagem
    client.on("messageCreate", (message) => {
    
      if (message.channel.id === "1024099237677514850" /*id do canal para auto reagir.*/) {
    
        let concordo = "✅"
        let nao_concordo = "❌"
    
        message.react(concordo).catch(e => { })
        message.react(nao_concordo).catch(e => { })
    
      } else { return; }
    })
    



module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})


client.on("ready", async() => { //Colocar na index ou pasta de eventos.

	const atividade = [{name: `Jogando`, type: 0}, {name: `Assistindo`, type: 3}, {name: `Ouvindo`, type: 2}]; //Mudar "name" para o seu status. Caso queira mais types: https://discord-api-types.dev/api/discord-api-types-v9/enum/ActivityType
	const status = [`online`, `idle`, `dnd`]; //online 🟢, idle 🟡, dnd 🔴

	let random1 = 0;
	setInterval(() => {
		if(random1 >= atividade.length) random1 = 0

		client.user.setActivity(atividade[random1])
		random1++ }, 10000) //Tempo em MS

	let random2 = 0;
	setInterval(() => {
		if(random2 >= atividade.length) random2 = 0

		client.user.setStatus(status[random2])
		random2++ }, 25000) //tempo em ms

})



client.on('ready', () => {
console.log("Carregando 25%🧶")
console.log("Carregando 67%🧶")
console.log("Carregando 99%🧶")
console.log("Estou Online🪀")
})

client.slashCommands = new Discord.Collection()

require('./handler/index.js')(client)

client.login(config.token)

