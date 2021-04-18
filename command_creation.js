const TOKEN = process.env.TOKEN /*change 'Your Discord Token Here to the token of your bot*/ //Reminder to change this to env var

//Command json to send to discord
/*const commandData =
{
    // Name of the command that users will enter
    "name": "hentai",
    // Short description of the command
    "description": "Danbooru",
    // All of the options that users can select
    "options": [
        {
            // Name of the subcommand
            "name": "id",
            // Short description of subcommand
            "description": "The identifier of the post",
            // Type of input from user: https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
            "type": 4,
            // Whether the subcommand is required
            "required": false,
            // If the subcommand is a string, you can specify choices that the user must select
        }
    ]
}
*/

// Danbooru
const commandData =
{
    "name": "Danbooru",
    "description": "Get danbooru content",
    "options": [
        {
            "name": "get",
            "description": "Get a danbooru post",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "id",
                    "description": "Get a post using an post id",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": [
                        {
                            "name": "id",
                            "description": "The post id",
                            "type": 4, // 4 is type INTEGER
                            "required": true
                        }
                    ]
                },
                {
                    "name": "random",
                    "description": "Get a random post from danbooru",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": []
                }
            ]
        },
        {
            "name": "info",
            "description": "Get the info for a danbooru post",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "id",
                    "description": "Get a post using an post id",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": [
                        {
                            "name": "id",
                            "description": "The post id",
                            "type": 4, // 4 is type INTEGER
                            "required": true
                        },
                    ]
                },
                {
                    "name": "random",
                    "description": "Get a random post from danbooru",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": []
                }
            ]
        },
        {
            "name": "search",
            "description": "Search danbooru with search terms",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "query",
                    "description": "Terms to search, use a + sign in between terms; 3 search terms max, all extra will be ignored",
                    "type": 3, // 3 is type STRING
                    "required": true
                }
            ]
        }
    ]
}

// rule34.xxx
const commandData =
{
    "name": "Rule34",
    "description": "Get rule34 content",
    "options": [
        {
            "name": "get",
            "description": "Get a rul34 post",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "id",
                    "description": "Get a post using an post id",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": [
                        {
                            "name": "id",
                            "description": "The post id",
                            "type": 4, // 4 is type INTEGER
                            "required": true
                        }
                    ]
                },
                {
                    "name": "random",
                    "description": "Get a random post from rule34",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": []
                }
            ]
        },
        {
            "name": "info",
            "description": "Get the info for a rule34 post",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "id",
                    "description": "Get a post using an post id",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": [
                        {
                            "name": "id",
                            "description": "The post id",
                            "type": 4, // 4 is type INTEGER
                            "required": true
                        },
                    ]
                },
                {
                    "name": "random",
                    "description": "Get a random post from rule34",
                    "type": 1, // 1 is type SUB_COMMAND
                    "options": []
                }
            ]
        },
        {
            "name": "search",
            "description": "Search rule34 with search terms",
            "type": 2, // 2 is type SUB_COMMAND_GROUP
            "options": [
                {
                    "name": "query",
                    "description": "Terms to search, use a + sign in between terms",
                    "type": 3, // 3 is type STRING
                    "required": true
                }
            ]
        }
    ]
}

//function to send to discord
async function main() {
    const fetch = require('node-fetch')

    const response = await fetch(apiEndpoint, {
        method: 'post',
        body: JSON.stringify(commandData),
        headers: {
            'Authorization': 'Bot ' + TOKEN,
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    console.log(json)
}

main()