require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN /*change 'Your Discord Token Here to the token of your bot*/ //Reminder to change this to env var
const apiEndpoint = 'https://discord.com/api/v8/applications/827591767590305833/guilds/716516840146468925/commands'
const Danbooru = require('danbooru')
const login = ''
const key = ''
const prefix = 'b!'

//slash-command listener
bot.ws.on("INTERACTION_CREATE", async (interaction) => {
    const interact = (data) =>
        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data,
        });

    try {
        switch (interaction.data.name) {
            case "hentai":
                if (!interaction.data.options) {

                    // Perform a search for popular image posts
                    const booru = new Danbooru()
                    booru.posts({ tags: 'genshin_impact rating:explicit ', limit: 30 }).then(posts => {
                        // Select a random post from posts array
                        const index = Math.floor(Math.random() * posts.length)
                        console.log(posts.length)

                        console.log(index)

                        const post = posts[index]


                        // Get post's url
                        const url = booru.url(post.file_url)

                        const name = post.id

                        interact({
                            type: 4,
                            data: {
                                content: "",
                                embeds: [
                                    {
                                        title: name,
                                        url: "https://danbooru.donmai.us/posts/" + name,
                                        color: Discord.Constants.Colors.BLURPLE,
                                        image: {
                                            url: url.href,
                                        },
                                    },
                                ],
                            },
                        });

                    });
                } else {
                    // Perform a search for popular image posts
                    const booru = new Danbooru()


                    const post = await booru.posts(interaction.data.options.find(
                        (option) => option.name == "id"
                    ) &&
                        interaction.data.options.find(
                            (option) => option.name == "id"
                        ).value);


                    // Get post's url
                    const url = booru.url(post.file_url)

                    const name = post.id

                    interact({
                        type: 4,
                        data: {
                            content: "",
                            embeds: [
                                {
                                    title: name,
                                    url: "https://danbooru.donmai.us/posts/" + name,
                                    color: Discord.Constants.Colors.BLURPLE,
                                    image: {
                                        url: url.href,
                                    },
                                },
                            ],
                        },
                    });
                }
                break;
        }

    } catch (error) {

        interact({
            type: 4,
            data: {
                content: "",
                embeds: [
                    {
                        title: "An error has occured!",
                        description:
                            "We're so sorry for the inconvenience!\n\nThe error has been automatically logged, so we'll start working on fixing this as soon as we see the message.\n\n" + error,
                        thumbnail: {
                            url: "https://i.imgur.com/J4jZEVD.png",
                        },
                        color: Discord.Constants.Colors.RED,
                    },
                ],
            },
        });
    }
});

//notes
/*bot will listen to whatever channel it has access to. Will send private message with the current code*/
/*anything with quotes ' ' information goes inside them*/


// Later on we make functions when we understand the wrapper????

// const registerCommand = (data) => {
//     bot.api
//         .applications(process.env.CLIENT_ID || bot.user.id)
//         .commands.post({ data });
// };

// registerCommand({
//     name: "hentai",
//     description: "Danbooru",
//     options: [{
//         name: "id",
//         description: "The identifier of the post",
//         type: 4,
//         required: false,
//     }, ],
// });

// bot.ws.on('INTERACTION_CREATE', async interaction => {
//     const booru = new Danbooru()
//     embed = ''
//     image = ''
//     await booru.posts({ tags: 'genshin_impact rating:explicit ' }).then(posts => { //Limit  does nothing?
//         // Select a random post from posts array
//         const index = Math.floor(Math.random() * posts.length)
//         console.log(posts.length)

//         console.log(index)

//         const post = posts[index]


//         // Get post's url
//         const url = booru.url(post.file_url)

//         const name = post.id

//         embed = new Discord.MessageEmbed()
//             .setColor('#00FFFF') //aqua
//             .setTitle(name) //index
//             .setURL('https://danbooru.donmai.us/posts/' + name) //links to page
//             .setImage(url.href)

//         image = url.href

//     })
//     bot.api.interactions(interaction.id, interaction.token).callback.post({
//         data: {
//             type: 3,
//             data: {
//                 content: image
//             }
//         }
//     })
// })

bot.on('message', async function(message) {

    var test = message.content
    if (test === 'hentai') {
        console.log(message.member.user.tag)

        // Perform a search for popular image posts

        const booru = new Danbooru()
        booru.posts({ tags: 'genshin_impact rating:explicit ', limit: 100 }).then(posts => { //Limit  does nothing?
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            console.log("Found " + posts.length + " posts")

            console.log("Selected " + index)

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


bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'tags') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        if (args.length > 3) {
            return message.channel.send(`You can only input 3 tags, ${message.author}`) //Currently unauthed users can only query 3 tags
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
        console.log(`User ${message.member.user.tag} invoked the ${command} command`)

        // Perform a search for popular image posts

        const booru = new Danbooru()


        tags = args.join(' ') //Joining the tags with a space to search with later 

        console.log(tags)
        booru.posts({ tags: tags, limit: 100 }).then(posts => { //Limit  does nothing?
            // Select a random post from posts array

            const index = Math.floor(Math.random() * posts.length)
            console.log("Found " + posts.length + " posts")

            if (posts.length === 0) { //If posts length is 0 that means the tags used to search are invalid
                return message.channel.send(`No posts found, invalid tags used, ${message.author}.`)

            }

            console.log("Selected Post index is " + index)

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


bot.login(TOKEN);