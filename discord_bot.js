const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = 'removed' /*change 'Your Discord Token Here to the token of your bot*/ //Reminder to change this to env var
const Danbooru = require('danbooru')



//notes
/*bot will listen to whatever channel it has access to. Will send private message with the current code*/
/*anything with quotes ' ' information goes inside them*/



//Later on we make functions when we understand the wrapper????

bot.on('message', async function(message) {

    var test = message.content
    if (test === 'hentai') {
        console.log(message.member.user.tag)
        message.channel.send("Hentai check")


        // Perform a search for popular image posts
        const booru = new Danbooru()
        booru.posts({ tags: 'order:rank' }).then(posts => {
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]

            // Get post's url
            const url = booru.url(post.file_url)

            message.channel.send(url.href)




        })


    }





});






















bot.login(TOKEN);