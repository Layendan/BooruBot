const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = '' /*change 'Your Discord Token Here to the token of your bot*/ //Reminder to change this to env var
const Danbooru = require('danbooru')
const login = ''
const key = ''



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
        booru.posts({ tags: 'genshin_impact rating:explicit ' }, { limit: 30 }).then(posts => { //Limit  does nothing?
            // Select a random post from posts array
            const index = Math.floor(Math.random() * posts.length)
            console.log(posts.length)

            console.log(index)

            const post = posts[index]


            // Get post's url
            const url = booru.url(post.large_file_url)

            message.channel.send(url.href)




        })





    }

});


bot.on('message', async function(message) {

    var test = message.content
    if (test === 'dump') {
        const booru = new Danbooru()

        console.log(message.member.user.tag)

        const posts = await booru.posts({ tags: 'steam' }, { limit: 20 })

        for (const post of posts) {
            const url = booru.url(post.large_file_url)
            message.channel.send(url.href)
        }



    } else if (test === 'dump2') {
        const booru = new Danbooru()

        console.log(message.member.user.tag)
        console.log("running second tag")

        const posts = await booru.posts({ page: 3, tags: 'genshin_impact' }) //page needs to given first as a param and then tags according to the API

        for (const post of posts) {
            const booru = new Danbooru()
            const url = booru.url(post.large_file_url)
            message.channel.send(url.href)
        }

    }

});



bot.login(TOKEN);