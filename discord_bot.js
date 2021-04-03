const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN || '' /*change 'Your Discord Token Here to the token of your bot*/ //Reminder to change this to env var
const apiEndpoint = 'https://discord.com/api/v8/applications/827591767590305833/guilds/716516840146468925/commands'
const Danbooru = require('danbooru')
const login = ''
const key = ''



//notes
/*bot will listen to whatever channel it has access to. Will send private message with the current code*/
/*anything with quotes ' ' information goes inside them*/



//Later on we make functions when we understand the wrapper????

const registerCommand = (data) => {
    bot.api
        .applications(process.env.CLIENT_ID || bot.user.id)
        .commands.post({ data });
};

registerCommand({
    name: "hentai",
    description: "Danbooru",
    options: [
        {
            name: "id",
            description: "The identifier of the post",
            type: 4,
            required: false,
        },
    ],
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    const booru = new Danbooru()
    embed = ''
    image = ''
    await booru.posts({ tags: 'genshin_impact rating:explicit ' }).then(posts => { //Limit  does nothing?
        // Select a random post from posts array
        const index = Math.floor(Math.random() * posts.length)
        console.log(posts.length)

        console.log(index)

        const post = posts[index]


        // Get post's url
        const url = booru.url(post.file_url)

        const name = post.id

        embed = new Discord.MessageEmbed()
            .setColor('#00FFFF') //aqua
            .setTitle(name) //index
            .setURL('https://danbooru.donmai.us/posts/' + name) //links to page
            .setImage(url.href)

        image = url.href

    })
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 3,
            data: {
                content: image
            }
        }
    })
})

bot.on('message', async function(message) {

    var test = message.content
    if (test === 'hentai') {
        console.log(message.member.user.tag)

        // Perform a search for popular image posts

        const booru = new Danbooru()
        booru.posts({ tags: 'genshin_impact rating:explicit ', limit: 30 }).then(posts => { //Limit  does nothing?
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            console.log(posts.length)

            console.log(index)

            const post = posts[index]


            // Get post's url
            const url = booru.url(post.file_url)

            const name = post.id

            const embed = new Discord.MessageEmbed()
                .setColor('#00FFFF') //aqua
                .setTitle(name) //index
                .setURL('https://danbooru.donmai.us/posts/' + name) //links to page
                .setImage(url.href)
                .setFooter(message.member.user.tag, message.member.user.avatarURL()) //member name + member image

            message.channel.send(embed)

        })
    }
});


bot.on('message', async function(message) {

    var test = message.content
    if (test === 'dump') {
        const booru = new Danbooru()

        console.log(message.member.user.tag)

        const posts = await booru.posts({ limit: 5, tags: 'steam' })

        for (const post of posts) {
            const url = booru.url(post.large_file_url)
            const name = post.id

            const embed = new Discord.MessageEmbed()
                .setColor('#00FFFF') //aqua
                .setTitle(name) //index
                .setURL('https://danbooru.donmai.us/posts/' + name) //links to page
                .setImage(url.href)
                .setFooter(message.member.user.tag, message.member.user.avatarURL()) //member name + member image

            message.channel.send(embed)
        }



    } else if (test === 'dump2') {
        const booru = new Danbooru()

        console.log(message.member.user.tag)
        console.log("running second tag")

        const posts = await booru.posts({ limit: 10, random: true, tags: 'hu_tao' }) //page needs to given first as a param and then tags according to the API

        for (const post of posts) {
            if (post.file_ext === 'mp4') {
                continue
            }
            const booru = new Danbooru()
            const url = booru.url(post.file_url)
            const name = post.id

            const embed = new Discord.MessageEmbed()
                .setColor('#00FFFF') //aqua
                .setTitle(name) //index
                .setURL('https://danbooru.donmai.us/posts/' + name) //links to page
                .setImage(url.href)
                .setFooter(message.member.user.tag, message.member.user.avatarURL()) //member name + member image

            message.channel.send(embed)
        }

    }

});



bot.login(TOKEN);