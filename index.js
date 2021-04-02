//Testing the code and API 


const Danbooru = require('danbooru')

// Perform a search for popular image posts
const booru = new Danbooru()
booru.posts({ tags: 'rating:safe order:rank' }).then(posts => {
    // Select a random post from posts array
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]

    // Get post's url and create a filename for it
    const url = booru.url(post.file_url)
    const name = `${post.md5}.${post.file_ext}`

    // Download post image using node's https and fs libraries
    require('https').get(url, response => {

        console.log(url)
        console.log(url.href)
    })
})